import authReducer, {
  initialState,
  resetFormData,
  setAccessToken,
  setRefreshToken,
  setUserEmail,
  setUserName,
  setUserPassword,
} from './auth-slice'

describe('authSlice', () => {


  beforeEach(() => {
    Object.defineProperty(global, 'localStorage', {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn(() => null),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should handle initial state', () => {
    const state = authReducer(undefined, { type: 'unknown' })

    expect(state).toEqual(initialState)
  })

  it('should handle setAccessToken', () => {
    const accessToken = 'newAccessToken'
    const action = setAccessToken({ accessToken })
    const state = authReducer(initialState, action)

    expect(state.accessToken).toBe(accessToken)
    expect(state.isAuthenticated).toBe(true)

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'access-token',
      accessToken,
    )
  })

  it('should handle setRefreshToken', () => {
    const refreshToken = 'newRefreshToken'
    const action = setRefreshToken({ refreshToken })
    const state = authReducer(initialState, action)

    expect(state.refreshToken).toBe(refreshToken)
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      'refresh-token',
      refreshToken,
    )
  })

  it('should handle setUserName', () => {
    const newUserName = 'newName'
    const action = setUserName({ name: newUserName })
    const state = authReducer(initialState, action)

    expect(state.userForm.name).toBe(newUserName)
  })

  it('should handle setUserEmail', () => {
    const newEmail = 'newEmail@example.com'
    const action = setUserEmail({ email: newEmail })
    const state = authReducer(initialState, action)

    expect(state.userForm.email).toBe(newEmail)
  })

  it('should handle setUserPassword', () => {
    const newPassword = 'newPassword'
    const action = setUserPassword({ password: newPassword })
    const state = authReducer(initialState, action)

    expect(state.userForm.password).toBe(newPassword)
  })

  it('should handle resetFormData', () => {
    const updatedState = {
      ...initialState,
      userForm: { name: 'newName', email: 'newEmail', password: 'newPassword' },
    }
    const action = resetFormData()
    const state = authReducer(updatedState, action)

    expect(state.userForm).toEqual(state.user)
  })
})
