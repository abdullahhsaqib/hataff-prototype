"""Set canonical metadata before deployment; supports a GitHub project subpath."""
from pathlib import Path
from urllib.parse import urlsplit
import sys,json,re
root=Path(__file__).resolve().parent.parent
if len(sys.argv)!=2:raise SystemExit('Usage: python3 tools/set_domain.py https://your-final-site.example[/repository]')
url=sys.argv[1].rstrip('/')
p=urlsplit(url)
if p.scheme!='https' or not p.netloc or p.query or p.fragment:raise SystemExit('Supply an absolute HTTPS URL without query or fragment.')
config=root/'site-config.json';old=json.loads(config.read_text())['site_url'].rstrip('/')
for name in ('index.html','robots.txt','sitemap.xml','404.html'):
 f=root/name
 f.write_text(f.read_text().replace(old+'/',url+'/'))
config.write_text(json.dumps({'site_url':url+'/'},indent=2)+'\n')
print('Metadata updated to '+url+'/; assets remain relative. This does not change DNS or configure hosting.')
