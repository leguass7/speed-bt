import { useEffect, useState } from 'react'

import { io } from 'socket.io-client'

import { hostSocket } from '~/helpers'
import { makeArray } from '~/helpers/array'
import type { SocketClientIo } from '~/server-side/services/SocketService/socket-service.dto'

const host = hostSocket()

export type ConnectionHandler = (host?: string) => any
export type UseSocketOptions = {
  connect?: ConnectionHandler | ConnectionHandler[]
  disconnect?: ConnectionHandler | ConnectionHandler[]
}

export function useSocket(query: string, { connect, disconnect }: UseSocketOptions = {}) {
  const [socket, setSocket] = useState<SocketClientIo | null>(null)

  useEffect(() => {
    let newSocket: SocketClientIo | null

    const initializeSoket = async () => {
      newSocket = io(host, { path: '/api/socketio', query: { query }, autoConnect: true })
      setSocket(newSocket)
      return newSocket
    }

    initializeSoket()

    return () => {
      if (newSocket) {
        newSocket.close()
        newSocket = null
      }
    }
  }, [setSocket, query])

  useEffect(() => {
    const connectListener = () => {
      makeArray(connect)?.forEach(cb => {
        if (typeof cb === 'function') cb(host)
      })
    }

    const disconnectListener = () => {
      makeArray(disconnect)?.forEach(cb => {
        if (typeof cb === 'function') cb(host)
      })
    }

    if (socket) {
      socket.on('connect', connectListener)
      socket.on('disconnect', disconnectListener)
    }

    return () => {
      if (socket) {
        socket.off('connect', connectListener)
        socket.off('disconnect', disconnectListener)
      }
    }
  }, [socket, disconnect, connect])

  return [socket]
}
