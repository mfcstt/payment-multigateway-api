import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class UserAlreadyExistsException extends Exception {
  static status = 409
  static code = 'USER_ALREADY_EXISTS'

  handle(error: this, { response }: HttpContext) {
    return response.status(error.status).json({
      code: error.code,
      message: 'User already exists',
    })
  }

  report(error: this, { logger }: HttpContext) {
    logger.error({ email: error.message }, 'User already exists')
  }
}
