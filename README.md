# Controlled OEM Gateway — Philips Healthcare

A 9-slide presentation deck for the Envision federal procurement channel proposal for Philips Healthcare. Deployed as a static site on Vercel.

## Project Structure

```
├── index.html        # Main HTML — slide content and structure
├── css/
│   └── styles.css    # All styles (variables, layout, animations)
├── js/
│   └── main.js       # Slide navigation and keyboard/touch controls
├── vercel.json       # Vercel deployment config with caching headers
└── README.md
```

## Editing Guide

- **Slide content**: Edit `index.html` — each slide is a `<div class="slide" data-slide="N">` block with a clear comment header
- **Styles**: Edit `css/styles.css` — organized by slide number (search for `SLIDE N` comments). Design tokens are CSS custom properties in `:root`
- **Navigation behavior**: Edit `js/main.js` — handles keyboard arrows, click-to-advance, and touch/swipe

## Navigation Controls

| Input | Action |
|---|---|
| Arrow Right / Space / PageDown | Next slide |
| Arrow Left / PageUp | Previous slide |
| Home | First slide |
| End | Last slide |
| Click anywhere | Next slide |
| Swipe left/right | Next/previous slide (mobile) |

## Deployment

Push to the connected branch and Vercel will auto-deploy. No build step required — this is a static site served directly.

## Local Development

Open `index.html` in a browser. No build tools or server needed.
