import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class ClientNotFoundException extends Exception {
  static status = 404
  static code = 'CLIENT_NOT_FOUND'

  handle(error: this, { response }: HttpContext) {
    return response.status(error.status).json({
      code: error.code,
      message: 'Client not found',
    })
  }

  report(error: this, { logger }: HttpContext) {
    logger.error({ clientId: error.message }, 'Client not found')
  }
}
