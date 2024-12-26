import { ApiResources, LocalStorageVars } from './types'

export const baseApiUrl: string = 'https://norma.nomoreparties.space/api'

export const ingredientsSlug: ApiResources = ApiResources.INGREDIENTS

export const ordersSlug: ApiResources = ApiResources.ORDERS

export const registerPath: ApiResources = ApiResources.REGISTER

export const loginPath: ApiResources = ApiResources.LOGIN

export const userPath: ApiResources = ApiResources.USER

export const tokenPath: ApiResources = ApiResources.TOKEN

export const accessTokenKey: LocalStorageVars = LocalStorageVars.ACCESSTOKEN
export const refreshTokenKey: LocalStorageVars = LocalStorageVars.REFRESHTOKEN
export const isResetPasswordKey: LocalStorageVars =
  LocalStorageVars.ISRESETPASSWORD
