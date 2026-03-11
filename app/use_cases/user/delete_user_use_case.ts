import type { UserRepositoryInterface } from '#domain/user/user_repository_interface'

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(id: number) {
    return this.userRepository.delete(id)
  }
}
