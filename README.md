# create-neon

Create Neon is a Vite + React project using JSX and Tailwind CSS v4. The app is organized with an enterprise-style `src/` structure and currently contains a landing page shell with a responsive, scroll-aware navbar.

## Tech Stack

- Vite
- React
- JSX
- Tailwind CSS v4
- ESLint

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

Run lint checks:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  app/                  App entry component
  assets/               Fonts, icons, and images
  components/
    layout/             Navbar, Footer, layout exports
    ui/                 Shared UI primitives
    forms/              Form components
    data-display/       Display components
    feedback/           Alerts, loaders, feedback components
  constants/            App-wide constants
  features/             Feature-specific modules
  hooks/                Shared React hooks
  lib/                  API, utilities, validators
  pages/                Page containers
  services/             API service layer
  store/                Global state
```

## Styling

Tailwind CSS v4 is configured through the Vite plugin in `vite.config.js`. Global styles live in `src/index.css`.

Local Euclid Circular A fonts are registered in `src/index.css` and exposed as the Tailwind utility:

```text
font-euclid
```

## Current UI

The current landing page is composed in `src/pages/LandingPage/index.jsx`:

- `Navbar`
- `Body`
- `Footer`

The navbar is responsive and scroll-aware:

- At the top, it uses the wide layout.
- On scroll, it becomes a floating pill.
- On small screens, it shows `CN` and a burger button.
