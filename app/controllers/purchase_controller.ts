import type { HttpContext } from '@adonisjs/core/http'
import { createPurchaseValidator } from '#validators/purchase'
import {
  listAllPurchasesUseCase,
  processPurchaseUseCase,
  purchaseDetailUseCase,
  refundPurchaseUseCase,
} from '#use_cases/make_purchase_use_cases'
import Client from '#models/client'
import Transaction from '#models/transaction'

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

  async detail({ params, response, bouncer }: HttpContext) {

  const transaction = await Transaction
    .query()
    .where('id', params.id)
    .preload('client')
    .firstOrFail()

  try {
    await bouncer.with('Policy').authorize('canView')
  } catch {
    await bouncer.with('Policy').authorize('canViewOwnTransaction', transaction)
  }

  const result = await purchaseDetailUseCase.execute(transaction.id)

  return response.ok(result)
}

  async refund({ params, response, bouncer }: HttpContext) {
    await bouncer.with('Policy').authorize('canRefund')

    const id = Number(params.id)
    const result = await refundPurchaseUseCase.execute(id)
    return response.ok(result)
  }
}
