import { test } from '@japa/runner'
import { UpdateUserUseCase } from '#use_cases/user/update_user_use_case'

test.group('UpdateUserUseCase Unit', () => {
  test('should update user with provided data', async ({ assert }) => {
    const updatedUser = {
      id: 1,
      fullName: 'Updated Name',
      email: 'updated@test.com',
      role: 'manager',
    }
    const mockRepository: any = {
      update: async () => Promise.resolve(updatedUser),
    }

    const useCase = new UpdateUserUseCase(mockRepository)
    const result = await useCase.execute(1, { fullName: 'Updated Name', role: 'manager' })

    assert.deepEqual(result, updatedUser)
  })

  test('should update only provided fields', async ({ assert }) => {
    const updatedUser = { id: 1, fullName: 'User 1', email: 'newemail@test.com', role: 'admin' }
    const mockRepository: any = {
      update: async () => Promise.resolve(updatedUser),
    }

    const useCase = new UpdateUserUseCase(mockRepository)
    const result = await useCase.execute(1, { email: 'newemail@test.com' })

    assert.deepEqual(result, updatedUser)
  })
})
