import { test } from '@japa/runner'
import { UpdateProductUseCase } from '#use_cases/product/update_product_use_case'

test.group('UpdateProductUseCase Unit', () => {
  test('should return updated product', async ({ assert }) => {
    const mockRepository: any = {
      update: async (_id: number, data: any) => Promise.resolve({ id: 1, ...data }),
    }

    const useCase = new UpdateProductUseCase(mockRepository)
    const result = await useCase.execute(1, { name: 'Updated' })

    assert.equal(result.name, 'Updated')
  })
})
