# Hataff Security — production static site

A self-contained HTML, CSS and JavaScript website. No npm, framework, build step, API key or paid service is required. Photographs and fonts are bundled locally.

## Upload to GitHub

1. Extract the ZIP and open the `hataff` folder.
2. Upload the **contents of that folder** to your repository root. `index.html` must be at the root, beside `assets/`, `style.css`, `cinematic.css` and `script.js`.
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
- `style.css`: base layout and responsive styles.
- `cinematic.css`: cinematic design, photographic scroll sequence, touch targets and motion fallbacks.
- `script.js`: navigation, scroll progress, motion control, accessible gallery and form validation.
- `assets/`: original website photographs/logo, sharing image, icon and local fonts with licence notices.
- `robots.txt`, `sitemap.xml`: search crawler configuration.
- `404.html`: missing-page screen.
- `tools/`: optional standard-library Python maintenance checks, not required to run the site.

Keep relative asset paths when using a GitHub repository subpath. To replace a photograph, preserve its filename or update both HTML and any service-photo references in script.js.

## Enquiries

The form validates a name, a 7–15-digit phone number and a selected service. It then opens WhatsApp in the same tab with the enquiry prepared for **+92 300 4342219**. The visitor still chooses whether to send. No form data is stored in this site, no analytics are installed and no email backend is required. Without JavaScript the form is disabled with call/email alternatives. Do not submit test messages to business staff.

## Motion and accessibility

The opening is a three-chapter photographic sequence, not a 3D animation. Scroll uses the browser's native scrolling. A Pause motion button is provided, and OS reduced-motion preferences are respected by default. The gallery uses a native modal dialog, Escape dismissal and focus return. Mobile navigation closes on selection/Escape. Images have dimensions and alt text; fonts are local with swap rendering.

## Validation

Run:

```bash
python3 tools/check.py
node --check script.js
```

See `RELEASE_NOTES.md` for checks performed and remaining deployment verification. No compatibility or ranking score is implied.

## Asset rights

Business content and photographs come from the existing Hataff website and were retained at the user's direction. Their ownership/licensing and business claims have not been independently authenticated. Font licence notices are included in `assets/fonts/`. No broader open-source licence is granted for the company branding or photographs.
