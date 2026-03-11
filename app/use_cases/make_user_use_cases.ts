import { LucidUserRepository } from '#infrastructure/repositories/lucid_user_repository'
import { SignUpUseCase } from './user/sign_up_use_case.js'
import { LoginUseCase } from './user/login_use_case.js'
import { LogoutUseCase } from './user/logout_use_case.js'
import { ListUsersUseCase } from './user/list_users_use_case.js'
import { GetUserByIdUseCase } from './user/get_user_by_id_use_case.js'
import { UpdateUserUseCase } from './user/update_user_use_case.js'
import { DeleteUserUseCase } from './user/delete_user_use_case.js'

const userRepository = new LucidUserRepository()

export const signUpUseCase = new SignUpUseCase(userRepository)
export const loginUseCase = new LoginUseCase(userRepository)
export const logoutUseCase = new LogoutUseCase()
export const listUsersUseCase = new ListUsersUseCase(userRepository)
export const getUserByIdUseCase = new GetUserByIdUseCase(userRepository)
export const updateUserUseCase = new UpdateUserUseCase(userRepository)
export const deleteUserUseCase = new DeleteUserUseCase(userRepository)
