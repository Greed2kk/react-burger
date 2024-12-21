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
}

export interface RegisterResponse {
  success: boolean
  user: {
    email: string
    name: string
  }
  accessToken: string
  refreshToken: string
  message?: string
}

export type RegisterData = {
  email: string
  password: string
  name: string
}
