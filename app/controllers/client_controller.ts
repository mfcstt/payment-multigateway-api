import { getClientPurchasesUseCase, listClientsUseCase } from '#use_cases/make_client_use_case'
import Client from '#models/client'
import type { HttpContext } from '@adonisjs/core/http'
import { clientIdValidator } from '#validators/client'

export default class ClientController {
  async getAll({ response, bouncer }: HttpContext) {
    await bouncer.with('Policy').authorize('canManageClients')

    const clients = await listClientsUseCase.execute()
    return response.ok(clients)
  }

  async clientPurchases({ params, response, bouncer }: HttpContext) {
    await clientIdValidator.validate(params)

    const client = await Client.findOrFail(params.id)

    try {
      await bouncer.with('Policy').authorize('canManageClients')
    } catch {
      await bouncer.with('Policy').authorize('canViewOwnPurchases', client)
    }

    const purchases = await getClientPurchasesUseCase.execute(client.id)
    return response.ok(purchases)
  }
}
