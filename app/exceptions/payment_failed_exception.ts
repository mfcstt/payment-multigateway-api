import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class PaymentFailedException extends Exception {
  static status = 400
  static code = 'PAYMENT_FAILED'

  handle(error: this, { response }: HttpContext) {
    return response.status(error.status).json({
      code: error.code,
      message: 'Unable to process the payment. Please try again',
    })
  }

  report(error: this, { logger }: HttpContext) {
    logger.error({ error: error.message }, 'Payment failed')
  }
}
