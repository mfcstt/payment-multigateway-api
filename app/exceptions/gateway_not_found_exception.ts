import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class GatewayNotFoundException extends Exception {
  static status = 404
  static code = 'GATEWAY_NOT_FOUND'

  handle(error: this, { response }: HttpContext) {
    return response.status(error.status).json({
      code: error.code,
      message: 'Payment gateway not found',
    })
  }

  report(error: this, { logger }: HttpContext) {
    logger.error({ gatewayId: error.message }, 'Gateway not found')
  }
}
