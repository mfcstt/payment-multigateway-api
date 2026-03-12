import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class TransactionNotFoundException extends Exception {
  static status = 404
  static code = 'TRANSACTION_NOT_FOUND'

  handle(error: this, { response }: HttpContext) {
    return response.status(error.status).json({
      code: error.code,
      message: 'Transaction not found',
    })
  }

  report(error: this, { logger }: HttpContext) {
    logger.error({ transactionId: error.message }, 'Transaction not found')
  }
}
