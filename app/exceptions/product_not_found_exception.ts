import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class ProductNotFoundException extends Exception {
  static status = 404
  static code = 'PRODUCT_NOT_FOUND'

  handle(error: this, { response }: HttpContext) {
    return response.status(error.status).json({
      code: error.code,
      message: 'Product not found',
    })
  }

  report(error: this, { logger }: HttpContext) {
    logger.error({ productId: error.message }, 'Product not found')
  }
}
