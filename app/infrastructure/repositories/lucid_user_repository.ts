import User from '#models/user'
import type { UserRepositoryInterface } from '#domain/user/user_repository_interface'
import type { UpdateUserInput } from '#domain/user/user_types'

export class LucidUserRepository implements UserRepositoryInterface {
  async findAll(): Promise<User[]> {
    return User.all()
  }

  async findById(id: number): Promise<User | null> {
    return User.find(id)
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findBy('email', email)
  }

  async create(data: { fullName: string | null; email: string; password: string }): Promise<User> {
    return User.create(data)
  }

  async update(id: number, data: UpdateUserInput): Promise<User> {
    const user = await User.findOrFail(id)
    user.merge(data)
    await user.save()
    return user
  }

  async delete(id: number): Promise<void> {
    const user = await User.findOrFail(id)
    await user.delete()
  }

  async verifyCredentials(email: string, password: string): Promise<User> {
    return User.verifyCredentials(email, password)
  }
}
