import { test } from '@japa/runner'
import ListAllPurchasesUseCase from '#use_cases/purchase/list_all_purchases_use_case'

test.group('ListAllPurchasesUseCase Unit', () => {
  test('should return all transactions', async ({ assert }) => {
    const mockTransactions = [
      { id: 1, amount: 100 },
      { id: 2, amount: 200 },
    ]
    const mockRepository: any = {
      findAllWithoutClientFilter: async () => Promise.resolve(mockTransactions),
    }

    const useCase = new ListAllPurchasesUseCase(mockRepository)
    const result = await useCase.execute()

    assert.lengthOf(result, 2)
  })
})
