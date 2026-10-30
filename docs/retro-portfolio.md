# 90s-ify portfolio

The time-machine card opens an original early-web tribute inspired by Space Jam's 1996 planet navigation. Artwork uses small native-resolution canvases with nearest-neighbour scaling and a local repeating star tile; there are no new dependencies or third-party image requests. The landing view contains only the logo, six destination labels, and two footer controls.

The modern portfolio stays mounted behind an inert layer, preserving card state. A 1.25-second CRT shutter/beam sequence covers the mode change in both directions. The retro view scrolls independently. Exit controls and Escape return to the trigger and original document scroll position. Reduced-motion users switch immediately. Rapid activation is ignored while the transition runs, and its timer is cleared on unmount.

The entry card shares the existing glass-card style and makes the entire tile clickable. The card shows only its title and arrow; hover and keyboard focus light up a small TV. The retro constellation and footer are vertically centered as a group, with scrolling available when details are open or the viewport is short. Desktop gives the portrait tech deck, wider quote, and retro tile a taller shared row; tablet uses paired cards plus a shallow retro strip. The tech deck preserves a 3:4 aspect ratio, and quote typography responds to card width with keyboard-accessible scrolling as a fallback. The application owns both grid coordinates and column counts at each breakpoint, avoiding conflicting responsive layouts.

## Validation

- `npm run build` (Vue TypeScript checks and Vite production build).
- `git diff --check`.
- Browser checks at 1280px, 800px, and 390px: enter with the card, open all three detail panels, close details, and exit with Escape. Confirm focus reaches the retro heading, detail panel, and originating card respectively.
- Check the existing CV PDF and external GitHub, LinkedIn, email, and inspiration destinations.
- With the operating system's reduced-motion preference enabled, verify immediate switching without shutters or hover motion transitions.

Existing live-service cards can show unavailable states in local preview without their API credentials. This feature does not depend on those services.

The repository’s longest quote was served by a temporary local fixture and verified to fit without scrolling at 1280px, 800px, and 390px. The fixture is not included in the application.
