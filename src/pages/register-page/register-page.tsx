import { FC, Fragment, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/components/app/store/store'
import AuthActions from '@/components/auth/auth-actions/auth-actions'
import AuthForm from '@/components/auth/auth-form/auth-form'

import { register } from '@/services/auth/regester'
import {
  getAuthError,
  getAuthLoading,
  getIsAuthenticated,
} from '@/services/auth/selectors'

import { loginPath } from '@/utils/route-paths'

import {
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

const RegisterPage: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(getAuthLoading)
  const isError = useAppSelector(getAuthError)
  const isAuthenticated = useAppSelector(getIsAuthenticated)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const clearForm = (): void => {
    if (isAuthenticated) {
      setEmail('')
      setPassword('')
      setName('')
    }
  }

  const onSubmit = (): void => {
    dispatch(register({ email, name, password }))
    clearForm()
  }

  const toLoginPage = (): void => {
    navigate(loginPath)
  }

  return (
    <Fragment>
      <AuthForm
        title="Регистрация"
        onSubmit={onSubmit}
        submitText="Зарегистрироваться"
        isLoading={isLoading}
      >
        {isError && <p className="text text_type_main-medium">{isError}</p>}
        {/* @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture warnings otherwise */}
        <Input
          onChange={e => setName(e.target.value)}
          type="text"
          value={name}
          placeholder="Имя"
          name="username"
          extraClass="mb-6"
        />

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
            text: 'Вспомнили пароль?',
            action: {
              text: 'Войти',
              onClick: toLoginPage,
            },
          },
        ]}
      />
    </Fragment>
  )
}

export default RegisterPage
