import { test } from '@japa/runner'
import { GetProductUseCase } from '#use_cases/product/get_product_use_case'

test.group('GetProductUseCase Unit', () => {
  test('should return product by id', async ({ assert }) => {
    const mockProduct = { id: 1, name: 'Test', amount: 100 }
    const mockRepository: any = {
      findById: async (_id: number) => Promise.resolve(mockProduct),
    }

    const useCase = new GetProductUseCase(mockRepository)
    const result = await useCase.execute(1)

    assert.equal(result.id, 1)
    assert.equal(result.name, 'Test')
  })
})
