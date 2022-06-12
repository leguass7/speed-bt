import type { Server, Socket as SocketServerSide } from 'socket.io'
import type { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

export interface ServerToClientEvents {
  users: (count: number) => void
  // basicEmit: (a: number, b: string, c: Buffer) => void
  // withAck: (d: string, callback: (e: number) => void) => void
}

export interface ClientToServerEvents {
  hello: (count: number) => void
}

export type ServerIo = Server<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>
export type SocketServerIo = SocketServerSide<ClientToServerEvents, ServerToClientEvents>
export type SocketClientIo = Socket<ServerToClientEvents, ClientToServerEvents>
//

export interface ISocketClient {
  id: string
  auth?: any
  socket: SocketServerIo
  latence: number
}

export type { SocketServerSide }
