# Healthcare translation test set

**Purpose:** Fixed clinical phrases for pitch-phase accuracy / latency benches.  
**Languages:** English (source truth) + Setswana / isiZulu / Xitsonga targets (fill as translations are validated).  
**Domains:** consent, symptoms, medication, teach-back, clarify.

## How to use

1. Run `prototype/language-bench` against each EN → L and L → EN pair.
2. Score: meaning preserved / partial / wrong / failed.
3. Log results in `language_capability_matrix.md` and `translation_provider_comparison.md`.

## Phrases

| ID | Domain | English |
| --- | --- | --- |
| C01 | Consent | I need to explain the risks of this procedure before you decide. |
| C02 | Consent | Do you understand what we discussed, and do you agree to continue? |
| C03 | Consent | You can ask questions at any time. |
| S01 | Symptoms | Where is the pain, and when did it start? |
| S02 | Symptoms | Is the pain sharp, dull, or burning? |
| S03 | Symptoms | Have you noticed reduced movement of the baby? |
| S04 | Symptoms | Do you feel short of breath when you walk? |
| M01 | Medication | Take two tablets in the morning with food. |
| M02 | Medication | Do not take this medicine on an empty stomach. |
| M03 | Medication | If you vomit after taking the medicine, contact the clinic. |
| T01 | Teach-back | Please tell me in your own words how you will take this medicine. |
| T02 | Teach-back | What warning signs should make you come back to the hospital? |
| Q01 | Clarify | I don’t understand. Can you explain that again more simply? |
| Q02 | Clarify | Please repeat the last instruction. |
| D01 | Discharge | Come back to the clinic in two weeks, or sooner if you get worse. |

## Target language columns (to fill)

| ID | Setswana | isiZulu | Xitsonga |
| --- | --- | --- | --- |
| C01 | _TBD_ | _TBD_ | _TBD_ |
| C02 | _TBD_ | _TBD_ | _TBD_ |
| C03 | _TBD_ | _TBD_ | _TBD_ |
| S01 | _TBD_ | _TBD_ | _TBD_ |
| S02 | _TBD_ | _TBD_ | _TBD_ |
| S03 | _TBD_ | _TBD_ | _TBD_ |
| S04 | _TBD_ | _TBD_ | _TBD_ |
| M01 | _TBD_ | _TBD_ | _TBD_ |
| M02 | _TBD_ | _TBD_ | _TBD_ |
| M03 | _TBD_ | _TBD_ | _TBD_ |
| T01 | _TBD_ | _TBD_ | _TBD_ |
| T02 | _TBD_ | _TBD_ | _TBD_ |
| Q01 | _TBD_ | _TBD_ | _TBD_ |
| Q02 | _TBD_ | _TBD_ | _TBD_ |
| D01 | _TBD_ | _TBD_ | _TBD_ |

## Mock fixtures

For the pitch demo, `MockProvider` maps a subset of English phrases to labelled placeholders so the UI always completes the loop without cloud keys.
