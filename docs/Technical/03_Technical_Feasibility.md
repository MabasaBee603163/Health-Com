# 03 — Technical Feasibility

| | |
| --- | --- |
| **Document type** | Technical feasibility brief (pitch phase) |
| **Audience** | Higher-ups, funders, hospital / DoH stakeholders |
| **Status** | Active — pitch demo, not production |
| **Last updated** | September 2026 |

## Purpose

This phase proves HealthCom is **fundable**, not that it is ward-ready.

Higher-ups should leave with:

1. **Why it matters** — research already in `Research/`
2. **What it feels like** — one shared tablet, doctor–patient communication loop
3. **That language tech is possible** — STT → translation → TTS for priority pairs
4. **A credible stack** to extend into a real product later

**Success = greenlight / funding for the next phase.**

## Locked stack

| Layer | Choice | Why |
| --- | --- | --- |
| Frontend | React + TypeScript + Vite | Fast UI iteration; strong component model for dual-pane UX |
| Design | Figma-first + in-repo design system | Pitch-quality experience; UI must not add friction |
| Backend | Node.js + Express (JS for pitch) | Simple, understandable, demo-friendly |
| Realtime | Socket.IO | Streaming utterance / translation status to one device |
| Data | Local JSON store (SQLite upgrade path) | Zero-ops demo store; avoids native build friction on OneDrive |

## Dual-track model

```text
03.1 Language & Translation POC

       TECHNICAL TRACK              UX TRACK
       Translation / speech APIs    Figma + single-tablet UI
       Latency / accuracy           Doctor + patient journey
       Language matrices            Accessibility + states
                 \                 /
                  WORKING DEMO
```

Tracks run in parallel and meet in the working prototype under `frontend/` + `backend/`.

## UX constraints (non-negotiable for the pitch)

- **One device only** — shared tablet; dual-pane Doctor | Patient
- Audio-first interaction
- Large, obvious targets
- Clear language switching
- Confirm / Repeat / Clarify
- Visible: translating, failed, mic silence, network drop
- Not a CRUD dashboard; not “Google Translate with a hospital logo”

## Quality bar

See `frontend/design/UX_Flows/01_consultation_loop.md`.

## Run the demo

See [DEMO.md](../../DEMO.md).

## Related docs

- [03.1 Language & Translation POC](./03_1_Language_Translation_POC.md)
- [Regulatory / privacy](../Security/Regulatory_Privacy_report.md)
- Research matrices under `Research/03_South_African_Languages/`
