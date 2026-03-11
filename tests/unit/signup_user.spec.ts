import { test } from '@japa/runner'
import { SignUpUseCase } from '#use_cases/user/sign_up_use_case'

test.group('SignUpUseCase Unit', () => {
  test('should create user and return token', async ({ assert }) => {
    const mockUser = { id: 1, fullName: 'Test User', email: 'test@test.com', role: 'user' }
    const mockToken = { value: { release: () => 'mock-token' } }

    const mockRepository: any = {
      create: async () => Promise.resolve(mockUser),
    }

    const useCase = new SignUpUseCase(mockRepository)

    const User = await import('#models/user')
    const originalCreate = User.default.accessTokens.create
    User.default.accessTokens.create = async () => mockToken as any

    const result = await useCase.execute({
      fullName: 'Test User',
      email: 'test@test.com',
      password: 'password123',
    })

    User.default.accessTokens.create = originalCreate

    assert.equal(result.user, mockUser)
    assert.equal(result.token.value!.release(), 'mock-token')
  })
})
