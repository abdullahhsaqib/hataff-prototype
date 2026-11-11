# Version 4 — section-entry assembly choreography

- Added meaningful assembly motion throughout the page: heading words approach from opposing offsets; content panels align; photo-frame corners construct around full images.
- Added a three-part People / Procedure / Equipment composition in services. Components arrive separately and align under one accountable command, using existing service concepts.
- Photo frames separate slightly on gallery hover; photos themselves remain still, whole and uncropped.
- Animation starts once on section entry through IntersectionObserver, then settles. The observer stops watching each element after its first entry. No scroll event listeners, requestAnimationFrame scene loops, pinning, parallax or image-mask scrubbing.
- Reduced-motion preferences skip the animation setup; content is readable before, during and after script loading. Photos are never masked by the assembly effects.
- The update uses native CSS and JavaScript without a new library, build step or subscription.
- Upload all files, including assembly.css and assembly.js. Delete obsolete cinematic.css, motion.css and motion.js from older releases. README contains GitHub and domain setup instructions.

Checks: JavaScript syntax, static content/assets and browser review. Physical-device and final GitHub-hosting checks remain deployment verification.
