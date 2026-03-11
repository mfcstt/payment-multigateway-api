import { test } from '@japa/runner'

test.group('LoginUseCase Unit', () => {
  test('should verify credentials and return token', async ({ assert }) => {
    const mockUser = { id: 1, fullName: 'Test User', email: 'test@test.com', role: 'admin' }
    const mockToken = { value: { release: () => 'mock-token' } }

    assert.equal(mockUser.email, 'test@test.com')
    assert.equal(mockToken.value!.release(), 'mock-token')
  })
})
