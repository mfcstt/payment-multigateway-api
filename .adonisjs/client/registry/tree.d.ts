/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    user: {
      signUp: typeof routes['auth.user.sign_up']
      login: typeof routes['auth.user.login']
      logout: typeof routes['auth.user.logout']
    }
  }
  profile: {
    user: {
      profile: typeof routes['profile.user.profile']
    }
  }
  product: {
    create: typeof routes['product.create']
    update: typeof routes['product.update']
    delete: typeof routes['product.delete']
    getAll: typeof routes['product.get_all']
    getById: typeof routes['product.get_by_id']
  }
  gateway: {
    toggle: typeof routes['gateway.toggle']
    updatePriority: typeof routes['gateway.update_priority']
  }
  purchase: {
    create: typeof routes['purchase.create']
    listAll: typeof routes['purchase.list_all']
    detail: typeof routes['purchase.detail']
    refund: typeof routes['purchase.refund']
  }
  client: {
    getAll: typeof routes['client.get_all']
    clientPurchases: typeof routes['client.client_purchases']
  }
  user: {
    getAll: typeof routes['user.get_all']
    getById: typeof routes['user.get_by_id']
    update: typeof routes['user.update']
    delete: typeof routes['user.delete']
  }
}
