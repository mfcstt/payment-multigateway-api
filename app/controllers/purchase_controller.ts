import type { HttpContext } from '@adonisjs/core/http'
import { createPurchaseValidator } from '#validators/purchase'
import {
  listAllPurchasesUseCase,
  processPurchaseUseCase,
  purchaseDetailUseCase,
  refundPurchaseUseCase,
} from '#use_cases/make_purchase_use_cases'
import Client from '#models/client'

export default class PurchaseController {
  async create({ request, response, auth }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(createPurchaseValidator)
    const userName = user.fullName || user.email

    const result = await processPurchaseUseCase.execute({
      userEmail: user.email,
      userName: userName,
      products: payload.products,
      payment: {
        email: user.email,
        cardNumber: payload.payment.cardNumber,
        cvv: payload.payment.cvv,
      },
    })

    return response.created(result)
  }

  async listAll({ response, bouncer }: HttpContext) {
    await bouncer.with('Policy').authorize('canView')

    const result = await listAllPurchasesUseCase.execute()
    return response.ok(result)
  }

  async detail({ params, response, auth }: HttpContext) {
    const id = Number(params.id)
    const user = auth.user!
    const isPrivileged = ['admin', 'manager', 'finance'].includes(user.role)

    if (!isPrivileged) {
      const client = await Client.findBy('email', user.email)
      if (!client) {
        return response.forbidden({ message: 'Access denied' })
      }

      const purchase = await purchaseDetailUseCase.execute(id)
      if (!purchase || purchase.clientId !== client.id) {
        return response.forbidden({ message: 'Access denied' })
      }
      return response.ok(purchase)
    }

    const result = await purchaseDetailUseCase.execute(id)
    return response.ok(result)
  }

  async refund({ params, response, bouncer }: HttpContext) {
    await bouncer.with('Policy').authorize('canRefund')

    const id = Number(params.id)
    const result = await refundPurchaseUseCase.execute(id)
    return response.ok(result)
  }
}
