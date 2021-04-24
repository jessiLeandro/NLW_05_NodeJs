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

  async findBySocketId(socket_id: string) {
    const connection = await this.connectionsRepository.findOne({ socket_id })

    return connection
  }

  async updateAdminId(user_id: string, admin_id: string) {
    await this.connectionsRepository
      .createQueryBuilder()
      .update(Connections)
      .set({ admin_id })
      .where('user_id = :user_id', {
        user_id
      })
      .execute()
  }

  async findAllWithoutAdmin() {
    const connections = await this.connectionsRepository.find({
      // where: { admin_id: null },
      relations: ['user']
    })

    return connections
  }
}

export { ConnectionsService }
