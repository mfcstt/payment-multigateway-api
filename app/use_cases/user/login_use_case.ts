import type { UserRepositoryInterface } from '#domain/user/user_repository_interface'
import User from '#models/user'

export class LoginUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return { user, token }
  }
}
