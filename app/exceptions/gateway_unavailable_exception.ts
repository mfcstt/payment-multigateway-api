import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class GatewayUnavailableException extends Exception {
  static status = 503
  static code = 'GATEWAY_UNAVAILABLE'

  handle(error: this, { response }: HttpContext) {
    return response.status(error.status).json({
      code: error.code,
      message: 'All payment gateways are unavailable. Please try again later.',
    })
  }

  report(error: this, { logger }: HttpContext) {
    logger.error({ error: error.message }, 'All payment gateways failed')
  }
}
