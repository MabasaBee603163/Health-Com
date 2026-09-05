const LABELS = { en: "English", tn: "Setswana", zu: "isiZulu", ts: "Xitsonga" }
const phrases = [
  "I need to explain the risks of this procedure before you decide.",
  "Take two tablets in the morning with food.",
  "I don’t understand. Can you explain that again more simply?",
]
const langs = ["en", "tn", "zu", "ts"]

console.log("HealthCom language bench (mock)\n")
for (const text of phrases) {
  for (const source of langs) {
    for (const target of langs) {
      if (source === target) continue
      const out = `[${LABELS[target]} ← ${LABELS[source]}] ${text}`
      console.log(`${source}→${target}: ${out.slice(0, 88)}…`)
    }
  }
  console.log("---")
}
console.log("Done.")
