import vine from '@vinejs/vine'

const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

export const signupValidator = vine.create({
  fullName: vine.string().nullable(),
  email: email().unique({ table: 'users', column: 'email' }),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
  role: vine.enum(['admin', 'manager', 'user', 'finance'] as const),
})

export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})

export const updateUserValidator = vine.create({
  fullName: vine.string().nullable().optional(),
  email: email().optional(),
  password: vine.string().minLength(8).maxLength(32).optional(),
  role: vine.enum(['admin', 'manager', 'user', 'finance'] as const).optional(),
})
