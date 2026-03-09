import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class ProductPolicy extends BasePolicy {
  public async canManage(user: User): Promise<AuthorizerResponse> {
    return user.role === 'admin' || user.role === 'finance' || user.role === 'manager'
  }
}