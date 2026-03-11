import type { HttpContext } from '@adonisjs/core/http'
import {
  createProductValidator,
  updateProductValidator,
} from '#validators/products'
import {
  createProductUseCase,
  updateProductUseCase,
  deleteProductUseCase,
  listProductsUseCase,
  getProductUseCase,
} from '#use_cases/make_product_use_cases'

export default class ProductController {

  async getAll({ response }: HttpContext) {
    const products = await listProductsUseCase.execute()
    return response.ok(products)
  }


  async getById({ params, response }: HttpContext) {
    const product = await getProductUseCase.execute(Number(params.id))
    return response.ok(product)
  }


  async create({ request, response, bouncer }: HttpContext) {
    await bouncer.with('Policy').authorize('canManageProducts')

    const payload = await request.validateUsing(createProductValidator)
    const product = await createProductUseCase.execute(payload)

    return response.created(product)
  }

  async update({ request, response, params, bouncer }: HttpContext) {
    await bouncer.with('Policy').authorize('canManageProducts')

    const id = Number(params.id)
    const payload = await request.validateUsing(updateProductValidator)
    const product = await updateProductUseCase.execute(id, payload)

    return response.ok(product)
  }


  async delete({ response, params, bouncer }: HttpContext) {
    await bouncer.with('Policy').authorize('canManageProducts')

    await deleteProductUseCase.execute(Number(params.id))

    return response.ok({ message: 'Product deleted successfully' })
  }
}
