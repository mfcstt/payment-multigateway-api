import type { ProductRepositoryInterface } from '#domain/product/product_repository_interface'
import type { CreateProductInput } from '#domain/product/product_types'

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: CreateProductInput) {
    return this.productRepository.create(input)
  }
}
