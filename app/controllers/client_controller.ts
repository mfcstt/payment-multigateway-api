import { getClientPurchasesUseCase, listClientsUseCase } from '#use_cases/make_client_use_case'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientController {
  async getAll({ response }: HttpContext) {
    const clients = await listClientsUseCase.execute()
    return response.ok(clients)
  }

  async clientPurchases({ params, response }: HttpContext) {
    const clientId = Number(params.id)
    const purchases = await getClientPurchasesUseCase.execute(clientId)
    return response.ok(purchases)
  }
}
