import type { ProductRepositoryInterface } from "#domain/product/product_repository_interface"

export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(id: number): Promise<void> {
    await this.productRepository.delete(id)
  }
}
