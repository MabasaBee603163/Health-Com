# Pitch demo walkthrough

**Goal:** Show higher-ups the HealthCom consultation loop on **one shared tablet**.

## Start

```bash
# terminal 1
cd backend
npm start

# terminal 2
cd frontend
npm run dev
```

- Backend: http://localhost:3001  
- Frontend: http://localhost:5173  

## Script (2–3 minutes)

1. **Select patient** — tap a patient card (e.g. Thabo / Setswana).
2. **Select languages** — Doctor English, Patient Setswana (or change to isiZulu / Xitsonga).
3. **Start consultation** — dual-pane appears: Doctor | Patient.
4. **Doctor → Speak** — status shows Listening → Translating → Patient text + audio.
5. **Patient confirm** — **Yes / Repeat / Clarify** (large targets).
6. **Patient → Respond** — doctor pane receives the translated reply.
7. Point at the status pill: connection / translating / ready states are visible.

## What to say

> This is not Google Translate with a hospital logo.  
> One device. Two languages. Speak, hear, confirm understanding.  
> The language path is mocked for reliability in the room; the same adapters can take a live provider next.

## Language bench

```bash
cd backend
npm run bench
```

## Figma

Add the real Figma URL in `frontend/design/Figma/README.md` when the file is ready. UI should track that file.
