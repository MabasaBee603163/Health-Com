# Translation provider comparison

**Question this answers:** Which MT provider should we use for the pitch and for a later build?

| Criterion | Mock (demo) | Azure Translator | Google Cloud Translation | Notes |
| --- | --- | --- | --- | --- |
| Pitch reliability | Excellent | Needs keys | Needs keys | Mock always on for demos |
| EN ↔ African languages | Fixture labels | Strong candidate | Strong candidate | Bench required |
| African ↔ African | Fixture via EN label | Likely pivot | Likely pivot | OK if UI hides pivot |
| SA data residency story | Local process | Azure SA regions available | Limited SA story | Prefer Azure for DoH narrative |
| POPIA / operator fit | Local | Better public-sector fit | Possible with DPAs | See Security brief |
| Latency (demo) | Instant | TBD | TBD | Fill after bench |
| Cost (demo) | Free | Pay-as-you-go | Pay-as-you-go | |
| Recommendation (pitch) | **Default** | Preferred live option | Alternate | Wire behind same adapter |

## Decision for this phase

Use **MockProvider** so the stakeholder demo never fails. Add Azure behind `LANGUAGE_PROVIDER=azure` when keys exist. Record bench scores here as they run.
