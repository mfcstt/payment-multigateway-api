import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class RefundFailedException extends Exception {
  static status = 400
  static code = 'REFUND_FAILED'

  handle(error: this, { response }: HttpContext) {
    return response.status(error.status).json({
      code: error.code,
      message: 'Refund failed',
    })
  }

  report(error: this, { logger }: HttpContext) {
    logger.error({ error: error.message }, 'Refund failed')
  }
}
