import type { UserRepositoryInterface } from '#domain/user/user_repository_interface'
import UserNotFoundException from '../../exceptions/user_not_found_exception.js'

export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(id: number) {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new UserNotFoundException(`User ${id} not found`)
    }
    return user
  }
}
