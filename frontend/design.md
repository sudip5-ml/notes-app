# Frontend Design System

This file documents the landing page design tokens for the `frontend` project. Use these assets, colors, gradients, and fonts consistently across the UI.

## Brand and Typography

- Primary font: `Outfit`
- Fallback system font: `sans-serif`
- Imported in `src/index.css`:
  - `https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap`

### Typography use
- Body / paragraph / input text: `Outfit`, `sans-serif`
- UI contrast and accent text is controlled through color tokens rather than font change.
- In special browser-mockup captions, `monospace` is used for the URL bar style.

## Color Palette

### Primary Base
- `#0f0f1a` — dark background, page base, main section background
- `#131324` — card and large surface background
- `#13131f` — darker card/header surface, secondary panel background
- `#1e1e3a` — subtle border and divider accent

### Primary Accent
- `#7c6ff7` — main brand accent, buttons, links, highlights
- `#a78bfa` — secondary accent used in gradients and hover states
- `#8b7eff` — hover accent for primary button state
- `#bba4ff` — soft hover accent highlight

### Text and UI Colors
- `#ffffff` — primary text on dark surfaces
- `#f8f8f8` — page-level text base
- `#9ca3af` — secondary text, subtitles, muted text
- `#6b7280` — low-emphasis text, footer links, secondary navigation

### Status / Utility Accent
- `#ef4444` — browser-style close button accent in mockup headers
- `#f59e0b` — browser-style minimize button accent
- `#22c55e` — browser-style maximize button accent

## Gradients

### Primary gradient
- `linear-gradient(135deg, #7c6ff7, #a78bfa)`
- Used for buttons, highlights, badges, navbar accent, feature cards, CTA backgrounds.

### Hover states
- `linear-gradient(135deg, #8b7eff, #bba4ff)`
- Used when hovering primary CTA buttons and interactive accents.

### Glass / border gradient
- `linear-gradient(#1a1a3e, #13131f) padding-box, linear-gradient(135deg, #7c6ff7, #a78bfa, #7c6ff7) border-box`
- Used for outlined cards and hero feature borders.

### Background glow gradients
- `radial-gradient(circle, rgba(124,111,247,0.12) 0%, transparent 70%)`
- `radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)`
- Used for hero ambient glow/background visual depth.

### Accent overlay gradient
- `linear-gradient(135deg, rgba(124,111,247,0.1), rgba(167,139,250,0.05))`
- Used for subtle footer and section accent overlays.

### Divider gradient
- `linear-gradient(to bottom, transparent, #1e1e3a, transparent)`
- Used for subtle separator lines in stats and content dividers.

## Shadows

- `0 0 20px rgba(124, 111, 247, 0.2)` — soft glow for buttons and cards
- `0 0 25px rgba(124, 111, 247, 0.4)` — stronger hover shadow for CTA buttons
- `0 30px 100px rgba(0, 0, 0, 0.6), 0 0 50px rgba(124, 111, 247, 0.15)` — hero dashboard mockup shadows
- `0 35px 110px rgba(0, 0, 0, 0.7), 0 0 60px rgba(124, 111, 247, 0.25)` — hover state for hero cards

## Assets

### Landing page media
- `src/assets/vidforloop.mp4` — hero/demo looping dashboard video used in Hero and Demo components

### Optional visual assets in repository
- `src/assets/Hero.jpg`
- `src/assets/hero.png`
- `src/assets/dashboard_mockup.png`
- `src/assets/react.svg`
- `src/assets/vite.svg`
- `src/assets/20260505_0554385566786928610188304 (1).jpg`
- `src/assets/IMG_20260505_053745.jpg`

> Prefer `vidforloop.mp4` for landing page animation assets and keep image use minimal unless needed for specific section design.

## UI Usage Guidelines

- Keep the landing page background consistently dark: `#0f0f1a` or `#131324`.
- Use `#ffffff` for primary headings and `#9ca3af` for supporting copy.
- Reserve the gradient `linear-gradient(135deg, #7c6ff7, #a78bfa)` for main CTAs and interactive highlights.
- Use `#7c6ff7` for text links, active nav items, and small badges.
- Use radial glow layers to create depth behind hero sections, not as the main background.
- Maintain rounded corners and soft shadows for cards, buttons, and panels.

## Notes

- This design system is centered on the landing page components and the overall brand styling in `frontend/src`.
- When adding new sections, reuse these colors and gradients to preserve visual consistency.
