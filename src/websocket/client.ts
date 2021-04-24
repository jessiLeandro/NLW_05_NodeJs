import { io } from '../http'
import { ConnectionsService } from '../services/Connections'
import { MessagesService } from '../services/MessagesService'
import { UsersService } from '../services/UsersService'

interface ParamsProps {
  text: string
  email: string
}

io.on('connect', (socket) => {
  console.log('object')
  const connectionsService = new ConnectionsService()
  const usersService = new UsersService()
  const messagesService = new MessagesService()

  socket.on('client_first_access', async (params: ParamsProps) => {
    const socket_id = socket.id
    const { text, email } = params as ParamsProps
    let user_id = null

    const userExists = await usersService.findByEmail(email)
    if (userExists) {
      user_id = userExists.id
      const connection = await connectionsService.findByUserId(userExists.id)

      if (connection) {
        connection.socket_id = socket_id

        await connectionsService.create(connection)
      } else {
        await connectionsService.create({
          socket_id,
          user_id: userExists.id
        })
      }
    } else {
      const user = await usersService.craete(email)

      user_id = user.id

      await connectionsService.create({
        socket_id,
        user_id: user.id
      })
    }

    await messagesService.create({
      text,
      user_id
    })
  })
})
