import { test } from '@japa/runner'
import { PurchaseByClientUseCase } from '#use_cases/clients/purchase_by_client_use_case'

test.group('PurchaseByClientUseCase Unit', () => {
  test('should return client with transactions', async ({ assert }) => {
    const mockClient = { id: 1, name: 'Test', email: 'test@test.com' }
    const mockTransactions = [{ id: 1, amount: 100 }]

    const mockClientRepository: any = {
      findById: async () => Promise.resolve(mockClient),
    }
    const mockTransactionRepository: any = {
      findAll: async () => Promise.resolve(mockTransactions),
    }

    const useCase = new PurchaseByClientUseCase(mockClientRepository, mockTransactionRepository)
    const result = await useCase.execute(1)

    assert.equal(result.client.name, 'Test')
    assert.lengthOf(result.transactions, 1)
  })

  test('should throw error if client not found', async ({ assert }) => {
    const mockClientRepository: any = {
      findById: async () => Promise.resolve(null),
    }
    const mockTransactionRepository: any = {
      findAll: async () => Promise.resolve([]),
    }

    const useCase = new PurchaseByClientUseCase(mockClientRepository, mockTransactionRepository)

    await assert.rejects(() => useCase.execute(999))
  })

  test('should not be able to access other client transactions', async ({ assert }) => {
    const mockClientRepository: any = {
      findById: async (id: number) => {
        if (id === 1) return Promise.resolve({ id: 1, name: 'Test', email: 'test@test.com' })
        return Promise.resolve(null)
      }
    }
    const mockTransactionRepository: any = {
      findAll: async () => Promise.resolve([]),
    }

    const useCase = new PurchaseByClientUseCase(mockClientRepository, mockTransactionRepository)

    await assert.rejects(() => useCase.execute(999))
  })
})