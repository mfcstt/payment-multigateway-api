export type UserRole = 'admin' | 'manager' | 'user' | 'finance'

export interface UpdateUserInput {
  fullName?: string | null
  email?: string
  password?: string
  role?: UserRole
}
