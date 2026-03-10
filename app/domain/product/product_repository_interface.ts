import type Product from "#models/product"
import type { CreateProductInput, UpdateProductInput } from "#domain/product/product_types"

export interface ProductRepositoryInterface {
  findAll(): Promise<Product[]>
  findById(id: number): Promise<Product>
  create(data: CreateProductInput): Promise<Product>
  update(id: number, data: UpdateProductInput): Promise<Product>
  delete(id: number): Promise<void>
}
