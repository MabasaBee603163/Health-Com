# 03.1 — Language & Translation Proof of Concept

| | |
| --- | --- |
| **Document type** | POC brief (pitch phase) |
| **Scope** | STT, MT, TTS for English, Setswana, isiZulu, Xitsonga |
| **Status** | Active — feasibility evidence, not production accuracy SLA |
| **Last updated** | September 2026 |

## Goal

Show decision-makers that HealthCom can:

1. Capture speech (STT)
2. Translate healthcare phrases accurately enough to demo (MT)
3. Speak the result back (TTS)
4. Let the user pick **source and target** without forcing English in the UI

Whether a provider uses English as an internal pivot is an implementation detail.

## Priority languages and pairs

| From \ To | English | Setswana | isiZulu | Xitsonga |
| --- | --- | --- | --- | --- |
| **English** | — | required | required | required |
| **Setswana** | required | — | required | required |
| **isiZulu** | required | required | — | required |
| **Xitsonga** | required | required | required | — |

## Success criteria (pitch)

| Capability | Pass if |
| --- | --- |
| STT | Demo can turn a spoken phrase into usable text for at least EN + one African language path (mock acceptable if live keys missing) |
| MT | Bench runs against `healthcare_translation_test_set.md`; results logged in matrices |
| TTS | Patient pane can play translated audio (mock TTS tone / browser speech ok for pitch) |
| UX path | User selects source + target; system handles path |
| Latency feel | UI shows translating state within ~200ms; result within a few seconds on mock/live |

## Failure modes the demo must show

- Translation fails → clear error + retry
- Mic hears nothing → silence state
- Network drops → connection state
- Patient doesn’t understand → Clarify / Repeat

## Artifacts

| Artifact | Path |
| --- | --- |
| Test phrases | `Research/03_South_African_Languages/healthcare_translation_test_set.md` |
| Language support | `Research/03_South_African_Languages/language_capability_matrix.md` |
| Provider compare | `Research/03_South_African_Languages/translation_provider_comparison.md` |
| Speech support | `Research/03_South_African_Languages/speech_capability_matrix.md` |
| Bench scripts | `prototype/language-bench/` |
| Adapters | `backend/src/services/language/` |

## Provider approach

1. **MockProvider** first — deterministic fixtures so the UX demo always works
2. Optional live provider behind env vars (Azure preferred for public-sector story)
3. Same adapter interface for both — UI never depends on a specific vendor
