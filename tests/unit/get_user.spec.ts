import { test } from '@japa/runner'
import { GetUserByIdUseCase } from '#use_cases/user/get_user_by_id_use_case'

test.group('GetUserByIdUseCase Unit', () => {
  test('should return user when found', async ({ assert }) => {
    const mockUser = { id: 1, fullName: 'User 1', email: 'user1@test.com', role: 'admin' }
    const mockRepository: any = {
      findById: async () => Promise.resolve(mockUser),
    }

    const useCase = new GetUserByIdUseCase(mockRepository)
    const result = await useCase.execute(1)

    assert.deepEqual(result, mockUser)
  })

  test('should return null when user not found', async ({ assert }) => {
    const mockRepository: any = {
      findById: async () => Promise.resolve(null),
    }

    const useCase = new GetUserByIdUseCase(mockRepository)
    const result = await useCase.execute(999)

    assert.isNull(result)
  })
})
