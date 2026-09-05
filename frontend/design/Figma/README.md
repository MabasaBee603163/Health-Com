# Figma (source of truth)

HealthCom consultation UX is **Figma-first**.

## File

- **Figma file URL:** _Add link here when the team file is created_
- **Owner:** HealthCom design / product
- **Scope:** Single-device dual-pane consultation loop + all states

## Required frames (minimum for pitch)

1. Select patient
2. Select languages
3. Consultation idle (Doctor | Patient)
4. Doctor speaking / listening
5. Translating
6. Patient listening / reading
7. Confirm understanding (Yes / Repeat / Clarify)
8. Patient responding
9. Doctor receiving translation
10. Error: translation failed
11. Error: mic silence
12. Error: network dropped

## Handoff

1. Design in Figma
2. Export key frames into `exports/` (optional PNGs)
3. Sync tokens into `../Design_System/`
4. Mirror flow notes in `../UX_Flows/01_consultation_loop.md`
5. Implement React UI to match — do not invent a parallel visual language

## Pitch note

The live demo must look like the Figma, not like a developer CRUD tool.
