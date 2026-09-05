export function registerSockets(io) {
  io.on("connection", (socket) => {
    socket.emit("session:state", { status: "connecting" })

    socket.on("session:start", ({ sessionId }) => {
      socket.join(sessionId)
      socket.emit("session:state", { status: "idle" })
    })

    socket.on("utterance:start", () => {
      socket.emit("session:state", { status: "listening" })
    })

    socket.on("utterance:final", () => {
      socket.emit("session:state", { status: "translating" })
    })

    socket.on("translation:ready", () => {
      socket.emit("session:state", { status: "awaiting_confirm" })
    })

    socket.on("comprehension:yes", () => {
      socket.emit("session:state", { status: "idle" })
    })

    socket.on("comprehension:repeat", () => {
      socket.emit("session:state", { status: "playing" })
      setTimeout(() => socket.emit("session:state", { status: "awaiting_confirm" }), 400)
    })

    socket.on("comprehension:clarify", () => {
      socket.emit("session:state", { status: "idle" })
    })
  })
}
