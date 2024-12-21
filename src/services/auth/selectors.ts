import type { StateSchema } from '@/components/app/store/types'

import type { AuthSchema } from '@/services/auth/types'

export const getAuthError = (state: StateSchema): AuthSchema['error'] =>
  state.auth.error

export const getAuthLoading = (state: StateSchema): AuthSchema['isLoading'] =>
  state.auth.isLoading

export const getIsAuthenticated = (
  state: StateSchema,
): AuthSchema['isAuthenticated'] => state.auth.isAuthenticated
