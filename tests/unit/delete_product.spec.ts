import { test } from '@japa/runner'
import { DeleteProductUseCase } from '#use_cases/product/delete_product_use_case'

test.group('DeleteProductUseCase Unit', () => {
  test('should call repository delete', async ({ assert }) => {
    let deleted = false
    const mockRepository: any = {
      delete: async () => {
        deleted = true
      },
    }

    const useCase = new DeleteProductUseCase(mockRepository)
    await useCase.execute(1)

    assert.isTrue(deleted)
  })
})
