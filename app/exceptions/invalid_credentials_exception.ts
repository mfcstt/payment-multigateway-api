import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class InvalidCredentialsException extends Exception {
  static status = 401
  static code = 'INVALID_CREDENTIALS'

  handle(error: this, { response }: HttpContext) {
    return response.status(error.status).json({
      code: error.code,
      message: 'Invalid email or password',
    })
  }

  report(error: this, { logger }: HttpContext) {
    logger.error({ error: error.message }, 'Invalid credentials')
  }
}
