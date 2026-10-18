# Atom Rosales portfolio

This repository contains [Atom Rosales's professional portfolio](https://atom-geo.github.io/), a concise Quarto website about applied spatial data science, GIS, remote sensing, and public health operations.

The site is organized around two ideas:

- The homepage explains the work and highlights selected analytical tools.
- The About page tells the professional story behind that work and provides a downloadable CV.

## Selected work

- **[Mosquito Complaint Hotspot Analysis](https://atom-geo.github.io/sr_kde_collier/):** an interactive, year-by-year kernel density analysis of resident mosquito complaints in Collier County.
- **[Aerial Swath Analysis Platform (ASAP)](https://jamca.kglmeridian.com/view/journals/moco/42/3/article-p237.xml):** a guided analytical workflow for evaluating granular aerial-application calibration data, swath uniformity, and overlap.

## Structure

- `index.qmd`: homepage and selected work
- `about.qmd`: professional background and career path
- `assets/about/Atom_Rosales_Resume.pdf`: downloadable CV
- `assets/social/atom-rosales-social.png`: social-sharing image
- `assets/css/styles.scss`: custom site styles

## Built with

- [Quarto](https://quarto.org/) for rendering
- SCSS for the visual system and responsive layout
- GitHub Actions and GitHub Pages for automated deployment

## Local preview

Install Quarto, then run:

```bash
quarto preview
```

## Publish

Push to `main`. The workflow in `.github/workflows/publish.yml` renders the site and deploys it to GitHub Pages.

In GitHub, go to:

Settings → Pages → Build and deployment → Source → GitHub Actions

