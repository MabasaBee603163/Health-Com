import cors from "cors"
import express from "express"
import { createServer } from "node:http"
import { Server } from "socket.io"
import { migrate } from "./db/index.js"
import { router } from "./routes/api.js"
import { registerSockets } from "./sockets/session.js"

migrate()

const app = express()
app.use(cors())
app.use(express.json({ limit: "1mb" }))
app.use("/api", router)

const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: "*" } })
registerSockets(io)

const port = Number(process.env.PORT ?? 3001)
httpServer.listen(port, () => {
  console.log(`HealthCom backend listening on http://localhost:${port}`)
})
