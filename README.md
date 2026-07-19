# Atom Rosales portfolio

This is a concise Quarto website for Atom Rosales, focused on spatial data science, GIS, public health, and professional experience.

## Structure

- `index.qmd` — homepage
- `about.qmd` — professional background and experience
- `assets/about/Atom_Rosales_Resume.pdf` — downloadable résumé
- `assets/social/atom-rosales-social.png` — social-sharing image
- `assets/css/styles.scss` — site styles

## Local preview

Install Quarto, then run:

```bash
quarto preview
```

## Publish

Push to `main`. The GitHub Action in `.github/workflows/publish.yml` renders the site and deploys it to GitHub Pages.

In GitHub, go to:

Settings → Pages → Build and deployment → Source → GitHub Actions

