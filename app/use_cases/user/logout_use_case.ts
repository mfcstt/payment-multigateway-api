import User from '#models/user'
import type { AccessToken } from '@adonisjs/auth/access_tokens'

export class LogoutUseCase {
  async execute(user: User, currentToken?: AccessToken) {
    if (currentToken) {
      await User.accessTokens.delete(user, currentToken.identifier)
    }
  }
}
