Create a scroll-aware floating navbar in React JSX with Tailwind CSS.

Behavior:
- At the top of the page: full width, transparent or light background, 
  no border, larger padding
- On scroll: shrinks into a centered floating pill container, 
  white background, rounded-full border, shadow, smooth transition

Implementation:
- Use a useEffect and window scroll event listener to detect scroll position
- Toggle a scrolled state when window.scrollY > 50
- Use Tailwind transition classes for smooth animation between states
- Navbar should be sticky top-0 with a high z-index

Do not add any content or links inside the navbar — 
empty shell only, I will fill it myself.