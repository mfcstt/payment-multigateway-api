import type { ProductRepositoryInterface } from "#domain/product/product_repository_interface"

export class GetProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(id: number) {
    return this.productRepository.findById(id)
  }
}
