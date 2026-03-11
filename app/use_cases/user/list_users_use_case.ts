import type { UserRepositoryInterface } from '#domain/user/user_repository_interface'

export class ListUsersUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute() {
    return this.userRepository.findAll()
  }
}
