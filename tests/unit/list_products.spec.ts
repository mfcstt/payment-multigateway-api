import { test } from '@japa/runner'
import { ListProductsUseCase } from '#use_cases/product/list_products_use_case'

test.group('ListProductsUseCase Unit', () => {
  test('should return products from repository', async ({ assert }) => {
    const mockProducts = [
      { id: 1, name: 'Product 1', amount: 100 },
      { id: 2, name: 'Product 2', amount: 200 },
    ]
    const mockRepository: any = {
      findAll: async () => Promise.resolve(mockProducts),
    }

    const useCase = new ListProductsUseCase(mockRepository)
    const result = await useCase.execute()

    assert.lengthOf(result, 2)
  })
})
