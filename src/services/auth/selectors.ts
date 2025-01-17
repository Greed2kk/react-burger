import { createSelector } from '@reduxjs/toolkit'

import type { StateSchema } from '@/components/app/store/types'

import { AuthSchema, User } from '@/services/auth/types'

export const getAuthError = (state: StateSchema): AuthSchema['error'] =>
  state.auth.error

export const getAuthLoading = (state: StateSchema): AuthSchema['isLoading'] =>
  state.auth.isLoading

export const getIsAuthenticated = (
  state: StateSchema,
): AuthSchema['isAuthenticated'] => state.auth.isAuthenticated

const getAuthUser = (state: StateSchema): AuthSchema['user'] => state.auth.user

export const getAuthUserForm = (state: StateSchema): AuthSchema['userForm'] =>
  state.auth.userForm

export const getFormIsChanged = createSelector(
  getAuthUser,
  getAuthUserForm,
  (user, userForm) => JSON.stringify(user) !== JSON.stringify(userForm),
)

export const getChangedData = createSelector(
  getAuthUser,
  getAuthUserForm,
  (user, userForm) => {
    const changedFields: Partial<User> = {}

    ;(Object.keys(userForm) as (keyof typeof userForm)[]).forEach(key => {
      if (user[key] !== userForm[key]) {
        changedFields[key] = userForm[key]
      }
    })

    return changedFields
  },
)

export const getResetPasswordEmail = (
  state: StateSchema,
): AuthSchema['resetPasswordEmail'] => state.auth.resetPasswordEmail
