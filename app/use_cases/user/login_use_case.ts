import User from '#models/user'

export class LoginUseCase {
  async execute(email: string, password: string) {
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return { user, token }
  }
}
