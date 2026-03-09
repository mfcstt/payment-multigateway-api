import type { ProductRepositoryInterface } from '#domain/product/product_repository_interface'

export class ListProductsUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute() {
    return this.productRepository.findAll()
  }
}
