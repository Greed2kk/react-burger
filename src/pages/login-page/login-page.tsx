import { ChangeEvent, FC, Fragment, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/components/app/store/store'
import AuthActions from '@/components/auth/auth-actions/auth-actions'
import AuthForm from '@/components/auth/auth-form/auth-form'

import { login } from '@/services/auth/login'
import {
  getAuthError,
  getAuthLoading,
  getIsAuthenticated,
} from '@/services/auth/selectors'

import { forgotPasswordPath, registerPath } from '@/utils/route-paths'

import {
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

const LoginPage: FC = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const isLoading = useAppSelector(getAuthLoading)
  const hasError = useAppSelector(getAuthError)
  const dispatch = useAppDispatch()
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!!hasError) {
      setError(true)
    }
  }, [hasError])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const clearForm = (): void => {
    if (isAuthenticated) {
      setEmail('')
      setPassword('')
      setError(false)
    }
  }

  const onSubmit = (): void => {
    dispatch(login({ email, password }))
    clearForm()
  }

  const toRegistration = (): void => {
    navigate(registerPath)
  }

  const toForgotPassword = (): void => {
    navigate(forgotPasswordPath)
  }

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
    setError(false)
  }

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
    setError(false)
  }

  return (
    <Fragment>
      {error && (
        <p className="text text_type_main-small mb-4">
          Неправильный логин или пароль
        </p>
      )}

      <AuthForm
        title="Вход"
        onSubmit={onSubmit}
        submitText="Войти"
        isLoading={isLoading || error}
      >
        <EmailInput
          onChange={emailChangeHandler}
          value={email}
          name="email"
          isIcon={false}
          extraClass="mb-6"
        />

        <PasswordInput
          onChange={passwordChangeHandler}
          value={password}
          name="password"
          extraClass="mb-6"
        />
      </AuthForm>

      <AuthActions
        actions={[
          {
            text: 'Вы — новый пользователь?',
            action: {
              text: 'Зарегистрироваться',
              onClick: toRegistration,
            },
          },
          {
            text: 'Забыли пароль?',
            action: {
              text: 'Восстановить пароль',
              onClick: toForgotPassword,
            },
          },
        ]}
      />
    </Fragment>
  )
}

export default LoginPage
