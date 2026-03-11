/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessToken: {
      store: typeof routes['auth.access_token.store']
      destroy: typeof routes['auth.access_token.destroy']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
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
}
