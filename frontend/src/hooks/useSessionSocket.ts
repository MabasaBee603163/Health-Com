import { useCallback, useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"
import type { SessionStatus } from "../services/types"

export function useSessionSocket(sessionId: string | null) {
  const socketRef = useRef<Socket | null>(null)
  const [status, setStatus] = useState<SessionStatus>("idle")
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    if (!sessionId) return

    const socket = io("/", { path: "/socket.io", transports: ["websocket", "polling"] })
    socketRef.current = socket

    socket.on("connect", () => {
      setConnected(true)
      setStatus("connecting")
      socket.emit("session:start", { sessionId })
    })

    socket.on("disconnect", () => {
      setConnected(false)
      setStatus("offline")
    })

    socket.on("session:state", (payload: { status: SessionStatus }) => {
      setStatus(payload.status)
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [sessionId])

  const emit = useCallback((event: string, payload?: unknown) => {
    socketRef.current?.emit(event, payload)
  }, [])

  return { status, setStatus, connected, emit }
}
