import UserTransformer from '#transformers/user_transformer'
import { loginValidator, signupValidator, updateUserValidator } from '#validators/user'
import {
  signUpUseCase,
  loginUseCase,
  logoutUseCase,
  listUsersUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase,
} from '#use_cases/make_user_use_cases'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  async signUp({ request, serialize }: HttpContext) {
    const data = await request.validateUsing(signupValidator)
    const { user, token } = await signUpUseCase.execute({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    })

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }

  async profile({ auth, serialize }: HttpContext) {
    return serialize(UserTransformer.transform(auth.getUserOrFail()))
  }

  async login({ request, serialize }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const { user, token } = await loginUseCase.execute(email, password)

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }

  async logout({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    await logoutUseCase.execute(user, user.currentAccessToken)

    return {
      message: 'Logged out successfully',
    }
  }

  async getAll({ response, bouncer }: HttpContext) {
    await bouncer.with('Policy').authorize('canManageUsers')

    const users = await listUsersUseCase.execute()
    return response.ok(users)
  }

  async getById({ params, response, bouncer }: HttpContext) {
    await bouncer.with('Policy').authorize('canManageUsers')

    const user = await getUserByIdUseCase.execute(Number(params.id))
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }
    return response.ok(user)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    await bouncer.with('Policy').authorize('canManageUsers')

    const user = await getUserByIdUseCase.execute(Number(params.id))
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    const data = await request.validateUsing(updateUserValidator)

    const updatedUser = await updateUserUseCase.execute(Number(params.id), data)
    return response.ok(updatedUser)
  }

  async delete({ params, response, bouncer }: HttpContext) {
    await bouncer.with('Policy').authorize('canManageUsers')

    const user = await getUserByIdUseCase.execute(Number(params.id))
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    await deleteUserUseCase.execute(Number(params.id))
    return response.ok({ message: 'User deleted successfully' })
  }
}
