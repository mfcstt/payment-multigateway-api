import { test } from '@japa/runner'
import { ListUsersUseCase } from '#use_cases/user/list_users_use_case'

test.group('ListUsersUseCase Unit', () => {
  test('should return users from repository', async ({ assert }) => {
    const mockUsers = [
      { id: 1, fullName: 'User 1', email: 'user1@test.com', role: 'admin' },
      { id: 2, fullName: 'User 2', email: 'user2@test.com', role: 'user' },
    ]
    const mockRepository: any = {
      findAll: async () => Promise.resolve(mockUsers),
    }

    const useCase = new ListUsersUseCase(mockRepository)
    const result = await useCase.execute()

    assert.lengthOf(result, 2)
  })
})
