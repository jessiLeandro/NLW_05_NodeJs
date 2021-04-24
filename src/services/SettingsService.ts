import { getCustomRepository } from 'typeorm'
import { Settings } from '../entities/Settings'
import { SettingsRepository } from '../repositories/SettingsRepository'

interface SettingsCreateProps {
  chat: boolean
  username: string
}

class SettingsService {
  async create({ chat, username }: SettingsCreateProps) {
    const settingsRepository = getCustomRepository(SettingsRepository)

    const userAlreadyExists = await settingsRepository.findOne({ username })

    if (userAlreadyExists) {
      throw new Error('user already exist!')
    }

    const settings = settingsRepository.create({
      chat,
      username
    })

    await settingsRepository.save(settings)

    return settings
  }

  async findByUsername(username: string) {
    const settingsRepository = getCustomRepository(SettingsRepository)

    const settings = await settingsRepository.findOne({ username })

    return settings
  }

  async update(username: string, chat: boolean) {
    const settingsRepository = getCustomRepository(SettingsRepository)

    await settingsRepository
      .createQueryBuilder()
      .update(Settings)
      .set({ chat })
      .where('username = :username', {
        username
      })
      .execute()
  }
}

export { SettingsService }
