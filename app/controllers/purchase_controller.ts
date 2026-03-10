import type { HttpContext } from '@adonisjs/core/http'
import { createPurchaseValidator } from '#validators/purchase'
import { listAllPurchasesUseCase, processPurchaseUseCase, purchaseDetailUseCase } from '#use_cases/make_purchase_use_cases'

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

  async listAll({ response }: HttpContext) {
    const result = await listAllPurchasesUseCase.execute()
    return response.ok(result)
  
}

async detail({ params, response }: HttpContext) {
    const id = Number(params.id)
    const result = await purchaseDetailUseCase.execute(id)
    return response.ok(result)
  }
}
