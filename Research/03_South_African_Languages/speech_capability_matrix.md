# Speech capability matrix

**Question this answers:** Can we STT and TTS the priority languages for a credible demo?

| Language | STT mock | STT live (planned) | TTS mock | TTS live (planned) | Notes |
| --- | --- | --- | --- | --- | --- |
| English | Yes (typed / sample) | Azure / browser | Yes (browser SpeechSynthesis) | Azure neural | Baseline |
| Setswana | Yes (sample utterance map) | TBD | Yes (labelled audio / browser if available) | TBD | Pitch uses fixtures if live weak |
| isiZulu | Yes (sample utterance map) | TBD | Yes | TBD | |
| Xitsonga | Yes (sample utterance map) | TBD | Yes | TBD | Often weakest in cloud STT |

## Demo behaviour

1. Doctor taps **Speak** → UI enters listening state.
2. Mock STT returns a canned clinical phrase after ~1s (or live STT if configured).
3. MT runs → patient pane shows text.
4. TTS plays (browser or mock beep + text highlight).

## Open questions for next phase

- Accent / ward-noise robustness
- Offline / edge STT for load-shedding wards
- SASL (out of scope for 03.1 speech path; see `Research/04_SASL`)
