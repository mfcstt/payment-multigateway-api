import vine from '@vinejs/vine'

export const gatewayToggleValidator = vine.create({
  id: vine.number().positive(),
})

export const gatewayPriorityValidator = vine.create({
  id: vine.number().positive(),
  priority: vine.number().positive().range([1, 100]),
})
