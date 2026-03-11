import type { UserRepositoryInterface } from '#domain/user/user_repository_interface'
import User from '#models/user'

export class SignUpUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(data: { fullName: string | null; email: string; password: string }) {
    const user = await this.userRepository.create(data)
    const token = await User.accessTokens.create(user)
    return { user, token }
  }
}
