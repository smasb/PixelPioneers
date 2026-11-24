# Pixel Pi-oneers website

A static HTML, CSS and JavaScript website for GitHub Pages. No build step needed.

## Files
- `index.html` – all page content, one section per block
- `style.css` – styles, organised into tokens, base, layout, components, sections and responsive rules
- `script.js` – mobile menu, footer year and the mini quiz
- `assets/` – logo and web-optimised photos (about 1 MB in total)

## Publish / update on GitHub Pages
1. Extract this ZIP.
2. Upload the contents to the root of your repository, replacing `index.html`, `style.css` and `script.js`.
3. Delete the old `assets` folder first (or delete the unused old photos) so the new, smaller images replace them.
4. Commit. GitHub Pages republishes automatically.

## Editing tips
- Colours and fonts are set once at the top of `style.css` under `:root`.
- Every block on the site uses the `.card` style, so new content stays consistent.
- Photos: keep them under about 1000 px wide and save as JPG (quality ~80) to keep the site fast.

## Contact links
Instagram: https://www.instagram.com/pixelpi_oneers/
Email: pixel@sakhikamva.org
