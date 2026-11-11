"""Dependency-free release checks. Run: python3 tools/check.py"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from collections import Counter
import json, re
root = Path(__file__).resolve().parent.parent
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.targets=[]; self.assets=[]; self.h1=0; self.errors=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='h1':self.h1+=1
        if tag=='a' and a.get('href','').startswith('#'):self.targets.append(a['href'][1:])
        if tag in ('img','script') and a.get('src'):self.assets.append(a['src'])
        if tag=='link' and a.get('rel') in ('stylesheet','icon'):self.assets.append(a['href'])
        if tag=='img' and 'alt' not in a:self.errors.append('Image has no alt attribute')
page=Page();html=(root/'index.html').read_text();page.feed(html)
errors=page.errors
errors += ['Duplicate ID: '+key for key,n in Counter(page.ids).items() if n>1]
errors += ['Missing anchor: '+key for key in page.targets if key not in page.ids]
errors += ['Missing asset: '+key for key in page.assets if not urlsplit(key).scheme and not(root/unquote(key)).is_file()]
if page.h1!=1:errors.append('Expected one H1')
for filename in ('style.css','cinematic.css','motion.css','assets/fonts/fonts.css'):
    css=(root/filename).read_text()
    for url in re.findall(r'url\([\"\']?([^\)\"\']+)',css):
        if urlsplit(url).scheme:errors.append('Remote CSS asset: '+url)
        elif not(root/filename).parent.joinpath(url).is_file():errors.append('Missing CSS asset: '+url)
for block in re.findall(r'<script[^>]+type="application/ld\+json"[^>]*>(.*?)</script>',html,re.S):json.loads(block)
if 'innerHTML=' in (root/'script.js').read_text():errors.append('Unexpected dynamic HTML content')
if len(re.findall(r'class="service reveal"',html))!=8:errors.append('Expected all eight static services')
if not(root/'.nojekyll').exists():errors.append('Missing .nojekyll')
if errors:
    raise SystemExit('\n'.join(errors))
print('PASS: internal links, unique IDs, image descriptions, local assets/fonts, structured data, static services and GitHub Pages marker.')
