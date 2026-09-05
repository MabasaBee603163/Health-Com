import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { randomUUID } from "node:crypto"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.resolve(__dirname, "../../data")
const dbPath = path.join(dataDir, "store.json")

const seed = {
  patients: [
    { id: "p1", name: "Thabo Molefe", preferredLang: "tn" },
    { id: "p2", name: "Nomsa Dlamini", preferredLang: "zu" },
    { id: "p3", name: "Akani Mabasa", preferredLang: "ts" },
  ],
  sessions: [],
  utterances: [],
}

function readStore() {
  if (!fs.existsSync(dbPath)) return structuredClone(seed)
  return JSON.parse(fs.readFileSync(dbPath, "utf8"))
}

function writeStore(store) {
  fs.mkdirSync(dataDir, { recursive: true })
  fs.writeFileSync(dbPath, JSON.stringify(store, null, 2))
}

export function migrate() {
  fs.mkdirSync(dataDir, { recursive: true })
  if (!fs.existsSync(dbPath)) writeStore(structuredClone(seed))
}

export const db = {
  listPatients() {
    return readStore().patients
  },
  createSession(row) {
    const store = readStore()
    store.sessions.push(row)
    writeStore(store)
  },
  addUtterance(row) {
    const store = readStore()
    store.utterances.push(row)
    writeStore(store)
  },
}

export { randomUUID }
