import { Server as HttpServer } from 'http'
import { Server, ServerOptions } from 'socket.io'

import { ISocketClient, ServerIo, SocketServerIo } from './socket-service.dto'

export type CustomServer = HttpServer & { io: Server }

const cors = { origin: '*' }

export class SocketRoute {}

export class SocketService {
  private io: ServerIo | undefined
  public clients: ISocketClient[]

  constructor(private routes?: SocketRoute[]) {
    this.io = undefined
    this.clients = []
  }

  private log(...message: any) {
    // eslint-disable-next-line no-console
    console.log(...message)
  }

  private addClient(data: ISocketClient) {
    // avoiding leakage
    this.clients = this.clients
      .map(item => {
        if (item.socket.disconnected) this.log(`DISCONNECTED`, item.socket.id)
        return item
      })
      .filter(({ socket }) => !socket.disconnected)

    this.clients.push(data)
  }

  private removeClient(socketId: string) {
    this.clients = this.clients.filter(f => f.id !== socketId)
  }

  createServer(server: CustomServer, opt?: Partial<ServerOptions>) {
    if (server.io) {
      this.log('Socket is already running')
    } else {
      this.log('Socket is initializing')
      server.io = new Server(server, { cors, ...opt })
      this.io = server.io
      this.init()
    }
  }

  init() {
    if (this.io) {
      this.routes.forEach(() => {
        //
      })

      this.io.on('connection', socket => {
        const id = `${socket?.id}`
        this.addClient({ id, socket, latence: 1000 })

        socket.on('disconnect', () => {
          this.removeClient(id)
          this.log(`USER DISCONNECTED`, id)
        })

        this.configureSocket(socket)

        const count = this.clients.length
        this.log('USER CONECTED:', count, id)
        socket.emit('users', count)
      })
    }
  }

  configureSocket(socket: SocketServerIo) {
    if (!this.io || !socket) return null

    socket.on('hello', count => {
      this.log('HELLO', count)
    })
  }
}
