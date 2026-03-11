import type { UserRepositoryInterface } from '#domain/user/user_repository_interface'
import type { UpdateUserInput } from '#domain/user/user_types'

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(id: number, input: UpdateUserInput) {
    return this.userRepository.update(id, input)
  }
}
