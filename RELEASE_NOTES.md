# Version 3 — normal scrolling and full photographs

## Changes

- Removed all pinned scenes, scroll event listeners, requestAnimationFrame scene loops, per-letter reconstruction, image-mask wipes, parallax and animated service-image swapping.
- Removed the obsolete cinematic.css, motion.css and motion.js files; the site now uses one stylesheet and a small interaction script.
- Added a short one-time opening entrance, restrained hover/focus states, native service accordions and a short photo-dialog entrance. Reduced-motion preferences disable animation.
- Rebuilt the hero and heritage as normal document sections. Every team photograph uses its original proportions and contain sizing; gallery captions are below images. No zoom effects crop faces.
- Retained the supplied enhanced photographs, olive/gold camouflage, business content and contact information.

## Verification

JavaScript syntax and static asset/anchor/metadata checks passed. Desktop browser review covered service expansion and full guard photograph framing. Narrow browser iframe checks at 320, 390 and 768 CSS-pixel frame widths showed no horizontal document overflow (usable viewport width excludes the browser scrollbar). Mobile navigation opened and closed, and image sizing was checked against natural image proportions. Browser review does not replace physical iOS/Android testing.

## Upload

Upload the contents of the hataff folder to the repository root. Replace index.html, style.css and script.js together. Old cinematic.css, motion.css and motion.js can be deleted from the repository; the new HTML no longer loads them. Retain assets/, .nojekyll, robots.txt and sitemap.xml. Deployment and domain instructions are in README.md.

The valid enquiry still hands off to WhatsApp; no test enquiry was sent. Physical-device behaviour, final hosting, HTTPS and domain configuration remain deployment checks. No measured speed score or universal compatibility claim is made.
