import type { UserRepositoryInterface } from '#domain/user/user_repository_interface'
import User from '#models/user'
import InvalidCredentialsException from '../../exceptions/invalid_credentials_exception.js'

export class LoginUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(email: string, password: string) {
    try {
      const user = await this.userRepository.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)
      return { user, token }
    } catch (error) {
      throw new InvalidCredentialsException('Invalid email or password')
    }
  }
}
