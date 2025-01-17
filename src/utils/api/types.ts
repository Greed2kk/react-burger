export enum ApiResources {
  INGREDIENTS = 'ingredients',
  ORDERS = 'orders',
  REGISTER = 'auth/register',
  LOGIN = 'auth/login',
  LOGOUT = 'auth/logout',
  FORGOTPASSWORD = 'password-reset',
  RESETPASSWORD = 'password-reset/reset',
  USER = 'auth/user',
  TOKEN = 'auth/token',
}

export enum LocalStorageVars {
  ACCESSTOKEN = 'access-token',
  REFRESHTOKEN = 'refresh-token',
  RESETPASSWORDEMAIL = 'reset-password-email',
}
