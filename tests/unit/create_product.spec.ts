import { test } from '@japa/runner'
import { CreateProductUseCase } from '#use_cases/product/create_product_use_case'

test.group('CreateProductUseCase Unit', () => {
  test('should return product with correct data', async ({ assert }) => {
    const mockRepository: any = {
      create: async (data: any) => ({ id: 1, ...data }),
    }

    const useCase = new CreateProductUseCase(mockRepository)
    const result = await useCase.execute({ name: 'Test', amount: 100 })

    assert.equal(result.name, 'Test')
    assert.equal(result.amount, 100)
  })
})
