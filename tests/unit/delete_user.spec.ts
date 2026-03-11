import { test } from '@japa/runner'
import { DeleteUserUseCase } from '#use_cases/user/delete_user_use_case'

test.group('DeleteUserUseCase Unit', () => {
  test('should delete user successfully', async ({ assert }) => {
    const mockRepository: any = {
      delete: async () => Promise.resolve(),
    }

    const useCase = new DeleteUserUseCase(mockRepository)

    await useCase.execute(1)

    assert.isTrue(true)
  })
})
