type User = {
  email: string
  name: string
}

export interface AuthSchema {
  user: User | null
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
