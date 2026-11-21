# FURL website

Static site: no build step needed.

## Publish on GitHub Pages
1. Create a repository and upload everything in this folder (keep `assets/` as is).
2. Settings > Pages > Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Your site appears at `https://<username>.github.io/<repo>/`. Add a custom domain under the same Pages settings.

## Things to edit
- `app.js` top: product list (`P`), prices, and the WhatsApp link (`WA`, currently a placeholder number).
- `index.html`: page text. Every text has an English and an Arabic version (`class="en"` / `class="ar"`).
- `assets/`: replace photos and films, then update the paths in `app.js` (`IM`) and `index.html`.
