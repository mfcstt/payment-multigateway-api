import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class InvalidPaymentDataException extends Exception {
  static status = 400
  static code = 'INVALID_PAYMENT_DATA'

  handle(error: this, { response }: HttpContext) {
    return response.status(error.status).json({
      code: error.code,
      message: 'Invalid payment data provided',
    })
  }

  report(error: this, { logger }: HttpContext) {
    logger.error({ error: error.message }, 'Invalid payment data')
  }
}
