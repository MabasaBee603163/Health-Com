# Design system (synced from Figma)

Tokens below are the **code mirror** of the Figma design system for the pitch demo.
When Figma tokens change, update this file and `src/styles/tokens.css`.

## Principles

- Interface almost disappears; conversation is the product
- Tablet-first, one shared device
- Large targets (≥ 48px)
- Obvious language roles
- Obvious speaker
- Obvious status (listening / translating / failed / offline)

## Colour roles

| Role | Intent |
| --- | --- |
| Doctor pane | Cool, clinical calm |
| Patient pane | Warm, welcoming calm |
| Accent action | High-visibility speak / confirm |
| Danger | Failures only |
| Surface | Soft layered atmosphere, not flat white dashboard |

## Type

- Display / UI: distinctive, readable (avoid Inter/Roboto/Arial as hero)
- Body: high legibility at arm’s length on a tablet
- Status text: short, plain language

## Motion

- Status changes: short fades (150–250ms)
- Listening pulse: gentle, not noisy
- Respect `prefers-reduced-motion`
