import { getCustomRepository } from 'typeorm'
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
}

export { SettingsService }