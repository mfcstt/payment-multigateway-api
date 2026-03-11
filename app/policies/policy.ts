import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class MainPolicy extends BasePolicy {

  canManageProducts(user: User): AuthorizerResponse {
    return ['admin', 'manager', 'finance'].includes(user.role)
  }

  canManageUsers(user: User): AuthorizerResponse {
    return ['admin', 'manager'].includes(user.role)
  }

  canRefund(user: User): AuthorizerResponse {
    return ['admin', 'finance'].includes(user.role)
  }

  canManageClients(user: User): AuthorizerResponse {
    return ['admin', 'manager'].includes(user.role)
  }

  canManagePurchases(user: User): AuthorizerResponse {
    return ['admin', 'manager', 'finance'].includes(user.role)
  }

  canManageGateways(user: User): AuthorizerResponse {
    return ['admin'].includes(user.role)
  }
}