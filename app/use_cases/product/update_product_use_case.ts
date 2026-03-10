import type { ProductRepositoryInterface } from "#domain/product/product_repository_interface"
import type { UpdateProductInput } from "#domain/product/product_types"

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(id: number, input: UpdateProductInput) {
    return this.productRepository.update(id, input)
  }
}
