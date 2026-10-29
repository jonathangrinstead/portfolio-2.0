# 90s-ify portfolio

The time-machine card opens an original early-web tribute inspired by Space Jam's 1996 planet navigation. Artwork is CSS plus the existing Memoji; there are no new dependencies or third-party image requests.

The modern portfolio stays mounted behind an inert layer, preserving card state. A 1.25-second CRT shutter/beam sequence covers the mode change in both directions. The retro view scrolls independently. Exit controls and Escape return to the trigger and original document scroll position. Reduced-motion users switch immediately. Rapid activation is ignored while the transition runs, and its timer is cleared on unmount.

## Validation

- `npm run build` (Vue TypeScript checks and Vite production build).
- `git diff --check`.
- Browser checks at desktop and 390px: enter with the card, open all three detail panels, close details, and exit with Escape. Confirm focus reaches the retro heading, detail panel, and originating card respectively.
- Check the existing CV PDF and external GitHub, LinkedIn, email, and inspiration destinations.
- With the operating system's reduced-motion preference enabled, verify immediate switching without shutters or hover motion transitions.

Existing live-service cards can show unavailable states in local preview without their API credentials. This feature does not depend on those services.
