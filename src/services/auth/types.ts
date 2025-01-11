export type User = {
  email: string
  name: string
  password?: string
}

export interface AuthSchema {
  user: User
  userForm: User
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  isResetPassword: boolean
}

export interface AuthResponse {
  success: boolean
  user: {
    email: string
    name: string
  }
  accessToken: string
  refreshToken: string
  message?: string
}

export interface AuthData {
  email: string
  password: string
}

export interface RegisterData extends AuthData {
  name: string
}
export interface LogoutResponse {
  success: boolean
  message: string
}

export interface LogoutData {
  token: string
}
