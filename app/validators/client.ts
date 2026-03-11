import vine from '@vinejs/vine'

export const clientIdValidator = vine.create({
  id: vine.number().positive(),
})
