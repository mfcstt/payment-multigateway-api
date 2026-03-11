import RefundPurchaseUseCase from '#use_cases/purchase/refund_purchase_use_case'
import { test } from '@japa/runner'

test.group('RefundPurchaseUseCase Unit', () => {
  test('should refund a purchase successfully', async ({ assert }) => {
    const mockTransaction = { id: 1, gateway_id: 1, external_id: 'abc123' }
    const mockGateway = { id: 1, name: 'gateway1' }

    const mockGatewayRepository: any = {
      findById: async () => Promise.resolve(mockGateway),
    }

    const mockTransactionRepository: any = {
      findByidWithProducts: async () => Promise.resolve(mockTransaction),
      findByid: async () => Promise.resolve(mockTransaction),
      update: async () => Promise.resolve(),
    }

    const useCase = new RefundPurchaseUseCase(mockGatewayRepository, mockTransactionRepository)
    const result = await useCase.execute(1)

    assert.equal(result.message, 'Reembolso processado com sucesso')
  })

  test('should throw error if transaction not found', async ({ assert }) => {
    const mockGatewayRepository: any = {
      findById: async () => Promise.resolve(null),
    }
    const mockTransactionRepository: any = {
      findByidWithProducts: async () => Promise.resolve(null),
    }

    const useCase = new RefundPurchaseUseCase(mockGatewayRepository, mockTransactionRepository)

    await assert.rejects(() => useCase.execute(999))
  })
})
