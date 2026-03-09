import { LucidProductRepository } from '#infrastructure/repositories/lucid_product_repository'
import { CreateProductUseCase } from './product/create_product_use_case.js'
import { DeleteProductUseCase } from './product/delete_product_use_case.js'
import { GetProductUseCase } from './product/get_product_use_case.js'
import { ListProductsUseCase } from './product/list_products_use_case.js'
import { UpdateProductUseCase } from './product/update_product_use_case.js'

const productRepository = new LucidProductRepository()

export const createProductUseCase = new CreateProductUseCase(productRepository)
export const updateProductUseCase = new UpdateProductUseCase(productRepository)
export const deleteProductUseCase = new DeleteProductUseCase(productRepository)
export const listProductsUseCase = new ListProductsUseCase(productRepository)
export const getProductUseCase = new GetProductUseCase(productRepository)
