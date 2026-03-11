import { getClientPurchasesUseCase, listClientsUseCase } from '#use_cases/make_client_use_case'
import Client from '#models/client'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientController {
  async getAll({ response, bouncer }: HttpContext) {
    await bouncer.with('Policy').authorize('canManageClients')

    const clients = await listClientsUseCase.execute()
    return response.ok(clients)
  }

  async clientPurchases({ params, response, auth }: HttpContext) {
    const clientId = Number(params.id)
    const user = auth.user!

    const isPrivileged = ['admin', 'manager', 'finance'].includes(user.role)

    if (!isPrivileged) {
      const client = await Client.findBy('email', user.email)
      if (!client || client.id !== clientId) {
        return response.forbidden({ message: 'Access denied' })
      }
    }

    const purchases = await getClientPurchasesUseCase.execute(clientId)
    return response.ok(purchases)
  }
}
