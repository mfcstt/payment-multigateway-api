import type User from '#models/user'
import type { UpdateUserInput } from '#domain/user/user_types'

export interface UserRepositoryInterface {
  findAll(): Promise<User[]>
  findById(id: number): Promise<User | null>
  create(data: { fullName: string | null; email: string; password: string }): Promise<User>
  update(id: number, data: UpdateUserInput): Promise<User>
  delete(id: number): Promise<void>
}
