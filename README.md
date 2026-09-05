# HealthCom

Multilingual clinical communication for South African public healthcare — preferred-language explanation, comprehension checks, and defensible digital records.

> **Current phase:** pitch-grade technical feasibility demo (not production).

## Quick start (demo)

```bash
# terminal 1
cd backend
npm install
npm run dev

# terminal 2
cd frontend
npm install
npm run dev
```

Open the Vite URL (default http://localhost:5173) on a tablet or desktop window.

**Demo loop:** Select patient → Select languages → Speak → Patient hears translation → Yes / Repeat / Clarify → Respond.

Full pitch script: [DEMO.md](DEMO.md).

## Repository structure

```text
Health-Com/
├── Research/
│   ├── 01_DGMAH/
│   ├── 02_Healthcare_Language_Barriers/
│   ├── 03_South_African_Languages/
│   ├── 04_SASL/
│   ├── 05_Existing_Solutions/
│   └── 06_Competitive_Gap/
├── docs/
│   ├── Product/
│   ├── Technical/          # 03 + 03.1 feasibility docs
│   ├── Security/
│   └── Testing/
├── frontend/               # React + TS + Vite (single-device dual-pane UX)
│   └── design/             # Figma link, design system, UX flows
├── backend/                # Express + Socket.IO + local JSON store (SQLite upgrade path)
├── prototype/
│   └── language-bench/     # Pair coverage bench
├── README.md
└── .gitignore
```

## Technical phase

See [docs/Technical/03_Technical_Feasibility.md](docs/Technical/03_Technical_Feasibility.md) and [docs/Technical/03_1_Language_Translation_POC.md](docs/Technical/03_1_Language_Translation_POC.md).

## Research briefs

| Folder | Focus |
| --- | --- |
| `01_DGMAH` | Anchor study: patients not seeking clarity at DGMAH |
| `02_Healthcare_Language_Barriers` | SA dual health system and access barriers |
| `03_South_African_Languages` | Language map + translation/speech matrices |
| `04_SASL` | South African Sign Language (placeholder) |
| `05_Existing_Solutions` | Status-quo tools and HealthCom gap |
| `06_Competitive_Gap` | Competitive positioning (placeholder) |

Regulatory notes: `docs/Security/Regulatory_Privacy_report.md`.

