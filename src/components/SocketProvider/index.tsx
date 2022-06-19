import React, { createContext, useContext, useEffect } from 'react'

import { useSocket, SocketClientIo } from '~/hooks/useSocket'
import { ServerToClientEvents } from '~/server-side/services/SocketService/socket-service.dto'

import { useUserAuth } from '../UserProvider'

export interface ISocketContext {
  socket?: SocketClientIo
}

export const SocketContext = createContext({} as ISocketContext)

type SocketProviderProps = {
  children: React.ReactNode
  disabled?: boolean
}
export const SocketProvider: React.FC<SocketProviderProps> = ({ children, disabled }) => {
  const { userData } = useUserAuth()
  const [socket] = useSocket(`${userData?.id || ''}`, { disabled: !!disabled })

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}

type KK = keyof ServerToClientEvents
type Params = Record<keyof ServerToClientEvents, ServerToClientEvents[KK]>

export function useAppSocket(events?: Params) {
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    const eventEntries = Object.entries(events)
    if (socket) {
      eventEntries.forEach(([key, value]) => {
        socket.on(key as keyof ServerToClientEvents, value)
      })
    }
    return () => {
      if (socket) {
        eventEntries.forEach(([key, value]) => {
          socket.off(key as keyof ServerToClientEvents, value)
        })
      }
    }
  }, [events, socket])

  // socket?.listeners(e => console.log('LLLLLL', e))

  return [socket]
}
