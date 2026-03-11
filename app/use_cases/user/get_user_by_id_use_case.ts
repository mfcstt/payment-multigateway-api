import type { UserRepositoryInterface } from '#domain/user/user_repository_interface'

export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(id: number) {
    return this.userRepository.findById(id)
  }
}
