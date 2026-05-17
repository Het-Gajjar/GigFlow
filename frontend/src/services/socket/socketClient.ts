import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import type { Notification } from '../../types/domain'

let socket: Socket | undefined

interface ConnectSocketArgs {
  userId: string
  token: string | null
  onNotification?: (notification: Notification) => void
}

export const connectSocket = ({ userId, token, onNotification }: ConnectSocketArgs) => {
  if (!userId || socket?.connected) return socket

  socket = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:5001', {
    auth: { userId, token },
    withCredentials: true,
  })

  socket.on('notification:new', (notification: Notification) => {
    onNotification?.(notification)
  })

  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = undefined
  }
}
