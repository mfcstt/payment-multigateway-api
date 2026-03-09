import vine from '@vinejs/vine'

export const createProductValidator = vine.create({
  name: vine.string().maxLength(255),
  amount: vine.number().positive(),
})

export const updateProductValidator = vine.create({
  name: vine.string().maxLength(255).optional(),
  amount: vine.number().positive().optional(),
})
