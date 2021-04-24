import { getCustomRepository, Repository } from 'typeorm'
import { Connections } from '../entities/Connections'
import { ConnectionsRepository } from '../repositories/ConnectiolnsRepository'

interface CreateConnectionsProps {
  user_id: string
  socket_id: string
  admin_id?: string
  id?: string
}

class ConnectionsService {
  private connectionsRepository: Repository<Connections>

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository)
  }

  async create({ user_id, socket_id, admin_id, id }: CreateConnectionsProps) {
    const connection = this.connectionsRepository.create({
      user_id,
      socket_id,
      admin_id,
      id
    })

    await this.connectionsRepository.save(connection)

    return connection
  }

  async findByUserId(user_id: string) {
    const connection = await this.connectionsRepository.findOne({ user_id })

    return connection
  }
}

export { ConnectionsService }
