# Release notes — 11 November 2026

## Included

- Three pinned photographic chapters using native scroll, transform and image masks.
- Local photographs, logo and self-hosted fonts; no external font/CDN dependency.
- All eight services and six principles in the initial HTML, independent of JavaScript.
- Responsive navigation with Escape/outside-click dismissal and active section indication.
- Motion pause/enable control and automatic reduced-motion default.
- Native photo dialog with an accessible caption, Escape dismissal and focus return.
- Required name, service and phone validation; whitespace name and digit-count checks.
- Same-tab WhatsApp handoff, avoiding popup blockers. No message is automatically sent.
- Descriptive metadata, canonical URL, Open Graph, Twitter card, organisation JSON-LD, sitemap, robots file, favicon and sharing image.
- Image dimensions, asynchronous decoding, primary-image preload and deferred script.
- Static GitHub Pages root deployment with .nojekyll and a custom 404 page.
- Maintenance checks and a helper to update the final domain metadata.

## Verification performed

- JavaScript syntax check passed.
- Dependency-free release check passed: unique IDs, internal anchor targets, local files/font references, image alt attributes, structured data and eight static service entries.
- Desktop Chrome: opening, scroll-driven chapters, return navigation, motion off/on, service preselection, gallery opening/Escape/focus return.
- Narrow viewport in a 390 × 844 browser iframe (375 px usable content width with scrollbar): hero and contact layout, menu open/close, navigation to contact and required-field rejection. No horizontal overflow found at the contact section.
- Invalid short phone rejected in browser without contacting WhatsApp.
- Script-disabled sandbox: service and principle content remains present; long pinned track collapses; contact alternatives remain available and form is disabled.
- Local font files and licence texts are present. No Google Fonts network requests are required.
- A mobile colour regression discovered during preparation was corrected and visually rechecked.

## Deployment checks still required

This package is ready to upload as a static website; it has not been deployed to the user's GitHub repository. After upload, verify the final URL, HTTPS, custom-domain DNS if used, and metadata matching that URL. Recheck WhatsApp opening on the actual device without sending a test enquiry to staff.

Physical iPhone/Safari and Android devices, assistive-technology testing and a full automated WCAG audit were not available in this review. No Lighthouse/Core Web Vitals score or search ranking is claimed. Source photographs remain limited by their original resolution.

The contact details, service claims, founding/licensing statements and photographs were retained from the existing company website. No additional clients, certifications or performance claims were invented.
