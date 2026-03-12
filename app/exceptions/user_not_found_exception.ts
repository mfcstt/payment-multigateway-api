import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class UserNotFoundException extends Exception {
  static status = 404
  static code = 'USER_NOT_FOUND'

  handle(error: this, { response }: HttpContext) {
    return response.status(error.status).json({
      code: error.code,
      message: 'User not found',
    })
  }

  report(error: this, { logger }: HttpContext) {
    logger.error({ userId: error.message }, 'User not found')
  }
}
