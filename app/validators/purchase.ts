import vine from '@vinejs/vine'

export const createPurchaseValidator = vine.create({
  products: vine
    .array(
      vine.object({
        product_id: vine.number().positive(),
        quantity: vine.number().positive(),
      })
    )
    .minLength(1),
  payment: vine.object({
    cardNumber: vine.string().minLength(16).maxLength(16),
    cvv: vine.string().minLength(3).maxLength(3),
  }),
})
