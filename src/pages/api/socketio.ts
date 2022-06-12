import { OutgoingMessage, Server as HttpServer } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { Server as ServerIO } from 'socket.io'

import { socketService } from '~/server-side/socket-service'

export const config = {
  api: {
    bodyParser: false
  }
}

interface SocketNextApiResponse extends NextApiResponse {
  socket: OutgoingMessage['socket'] & { server: HttpServer & { io: ServerIO } }
}

const SocketHandler = async (req: NextApiRequest, res: SocketNextApiResponse) => {
  socketService.createServer(res.socket.server, { path: '/api/socketio' })
  res.end()
}

export default SocketHandler
