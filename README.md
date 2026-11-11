# Hataff Security — production static site

Version 4: section-triggered assembly animations, normal scrolling and full photographs.

A self-contained HTML, CSS and JavaScript website. No npm, framework, build step, API key or paid service is required. Photographs and fonts are bundled locally.

## Upload to GitHub

1. Extract the ZIP and open the `hataff` folder.
2. Upload the **contents of that folder** to your repository root. `index.html` must be at the root, beside `assets/`, `style.css` and `script.js`.
3. Commit the files, including `.nojekyll` (a hidden file).
4. In the repository, open **Settings → Pages**. Choose **Deploy from a branch**, select your branch (usually `main`) and **/(root)**, then Save.
5. GitHub will show the published URL when deployment completes. Plain asset paths also work under a repository subpath.

Official publishing instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Uploading code does not automatically move the existing www.hataff.com site or change DNS. This package has no CNAME file, so it does not request a domain change.

## Set the final website address

Metadata is prepared for `https://www.hataff.com/`. If this is the final domain, leave it as is. If you will keep the site at a different URL, including a GitHub Pages project URL, run:

```bash
python3 tools/set_domain.py https://YOUR-USERNAME.github.io/YOUR-REPOSITORY
```

Use your actual URL. The helper updates canonical, sharing, organisation and sitemap URLs. If you later connect www.hataff.com, run it again with `https://www.hataff.com` and upload the changed files. Configure your chosen custom domain in hosting settings separately.

## Local preview

Open `index.html` directly in a modern browser, or serve the repository directory:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000. No Python packages are needed. This server is for local preview only.

## Editing

- `index.html`: all business content, navigation, eight services, six principles, six sectors, contacts and metadata. Content remains readable without JavaScript.
- `style.css`: responsive layout, camouflage treatment, brief entrance/hover/dialog transitions and reduced-motion support.
- `script.js`: mobile navigation, accessible gallery and enquiry validation.
- `assembly.css`, `assembly.js`: bounded section-entry assembly choreography, component construction and frame-corner separation.
- `assets/army-pattern.svg`: local vector camouflage inspired by the supplied reference.
- `assets/`: original website photographs/logo, sharing image, icon and local fonts with licence notices.
- `robots.txt`, `sitemap.xml`: search crawler configuration.
- `404.html`: missing-page screen.
- `tools/`: optional standard-library Python maintenance checks, not required to run the site.

Keep relative asset paths when using a GitHub repository subpath. To replace a photograph, preserve its filename or update both HTML and any service-photo references in script.js.

## Enquiries

The form validates a name, a 7–15-digit phone number and a selected service. It then opens WhatsApp in the same tab with the enquiry prepared for **+92 300 4342219**. The visitor still chooses whether to send. No form data is stored in this site, no analytics are installed and no email backend is required. Without JavaScript the form is disabled with call/email alternatives. Do not submit test messages to business staff.

## Motion, photography and accessibility

Scrolling is completely normal. There are no pinned scenes, scroll-controlled masks, parallax, per-letter scroll effects, background drift or service-image swapping. Headings assemble word by word, content panels align from opposing directions, and photo frame corners construct around intact images. The services include a People / Procedure / Equipment construction sequence. Effects trigger once when entering view and settle within roughly one second; they do not scrub or delay scrolling. The opening, native service accordions and photo dialog also have short interaction transitions. Reduced-motion preferences disable transitions/animations.

Every team photograph is shown at its natural proportions, using automatic height and contain sizing. Captions sit below gallery photographs; no text, masks or zoom effects cover faces. On phones, photographs appear in the vertical page flow and may naturally extend below the viewport, but the source image itself is not cropped.

The gallery uses a native modal dialog, Escape dismissal and focus return. Mobile navigation closes on selection/Escape. Images have alt text and dimensions. Without JavaScript, service accordions still work and text/images remain visible; the enquiry form explains call/email alternatives.

## Validation

Run:

```bash
python3 tools/check.py
node --check script.js
```

See `RELEASE_NOTES.md` for checks performed and remaining deployment verification. No compatibility or ranking score is implied.

## Asset rights

Business content comes from the existing Hataff website. Three user-supplied enhanced images replace the previous lower-resolution photographs; the logo is retained. Their ownership/licensing and business claims have not been independently authenticated. Font licence notices are included in `assets/fonts/`. No broader open-source licence is granted for the company branding or photographs.
