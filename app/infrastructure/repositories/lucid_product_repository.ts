import Product from '#models/product'
import type { ProductRepositoryInterface } from '#domain/product/product_repository_interface'
import type { CreateProductInput, UpdateProductInput } from '#domain/product/product_types'

export class LucidProductRepository implements ProductRepositoryInterface {
  async findAll(): Promise<Product[]> {
    return Product.all()
  }

  async findById(id: number): Promise<Product> {
    return Product.findOrFail(id)
  }

  async create(data: CreateProductInput): Promise<Product> {
    return Product.create(data)
  }

  async update(id: number, data: UpdateProductInput): Promise<Product> {
    const product = await Product.findOrFail(id)
    product.merge(data)
    await product.save()
    return product
  }

  async delete(id: number): Promise<void> {
    const product = await Product.findOrFail(id)
    await product.delete()
  }
}
