import { FC, Fragment, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/components/app/store/store'
import AuthActions from '@/components/auth/auth-actions/auth-actions'
import AuthForm from '@/components/auth/auth-form/auth-form'

import { login } from '@/services/auth/login'
import { getIsAuthenticated } from '@/services/auth/selectors'

import { forgotPasswordPath, registerPath } from '@/utils/route-paths'

import {
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

const LoginPage: FC = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const clearForm = (): void => {
    if (isAuthenticated) {
      setEmail('')
      setPassword('')
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

  return (
    <Fragment>
      <AuthForm title="Вход" onSubmit={onSubmit} submitText="Войти">
        <EmailInput
          onChange={e => setEmail(e.target.value)}
          value={email}
          name="email"
          isIcon={false}
          extraClass="mb-6"
        />

        <PasswordInput
          onChange={e => setPassword(e.target.value)}
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
