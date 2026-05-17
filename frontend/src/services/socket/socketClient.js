import { io } from 'socket.io-client'

let socket

export const connectSocket = ({ userId, token, onNotification }) => {
  if (!userId || socket?.connected) return socket

  socket = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:5001', {
    auth: { userId, token },
    withCredentials: true,
  })

  socket.on('notification:new', (notification) => {
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
