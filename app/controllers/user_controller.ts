import User from "#models/user"
import UserTransformer from "#transformers/user_transformer"
import { loginValidator, signupValidator } from "#validators/user"
import type { HttpContext } from "@adonisjs/core/http"

export default class UserController {

 async signUp({ request, serialize }: HttpContext) {
    const { fullName, email, password } = await request.validateUsing(signupValidator)

    const user = await User.create({ fullName, email, password })
    const token = await User.accessTokens.create(user)

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
  
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)
  
      return serialize({
        user: UserTransformer.transform(user),
        token: token.value!.release(),
      })
    }

    async logout({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    if (user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }

    return {
      message: 'Logged out successfully',
    }
  }

}