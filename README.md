# Create Neon

Create Neon is a Vite + React landing page for a custom LED neon and illuminated signage brand. It uses JSX, Tailwind CSS v4, local Euclid Circular A fonts, and image/icon assets from the project.

## Tech Stack

- Vite
- React
- JSX
- Tailwind CSS v4
- ESLint

## Features

- Responsive landing page for custom neon and illuminated signs
- Scroll-aware navigation that changes from a full-width header into a floating pill
- Hero section with full-background imagery and primary calls to action
- Product option cards for custom sign workflows
- Benefits section highlighting shipping, guarantee, pricing, efficiency, remote, and installation
- Scroll-stacked image showcase section
- Local font loading through Tailwind's `font-euclid` utility

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run lint checks:

```bash
npm run lint
```

## Project Structure

```text
src/
  app/                         App entry component
  assets/
    fonts/                     Euclid Circular A font files
    icons/                     SVG and PNG icon assets
    image/                     Landing page image assets
  components/
    layout/                    Navbar, Footer, and layout exports
  constants/                   App-wide constants
  features/                    Feature-specific modules
  hooks/                       Shared React hooks
  lib/                         API, utilities, and validators
  pages/
    LandingPage/
      sections/                Hero, overview, and showcase sections
  services/                    API service layer
  store/                       Global state
```

## Landing Page

The landing page is composed in `src/pages/LandingPage/index.jsx`:

- `Navbar`
- `Body`
- `Footer`

`Body` renders the main sections:

- `HeroSection`
- `OverviewSection`
- `BestShowcaseSection`

## Styling

Tailwind CSS v4 is configured through the Vite plugin in `vite.config.js`. Global styles and font registration live in `src/index.css`.

The local Euclid Circular A font family is exposed as:

```text
font-euclid
```

## Scripts

```bash
npm run dev      # Start local development
npm run build    # Build production assets
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```
