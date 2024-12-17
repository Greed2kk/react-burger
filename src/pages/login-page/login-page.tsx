import { FC, Fragment } from 'react'

import { useNavigate } from 'react-router-dom'

import AuthActions from '@/components/auth/auth-actions/auth-actions'
import AuthForm from '@/components/auth/auth-form/auth-form'

import { forgotPasswordPath, registerPath } from '@/utils/route-paths'

import {
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'


const LoginPage: FC = () => {
  const navigate = useNavigate()

  const onSubmit = (): void => {
    console.log('call')
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
          onChange={() => {}}
          value={''}
          name={'email'}
          isIcon={false}
          extraClass="mb-6"
        />

        <PasswordInput
          onChange={() => {}}
          value={''}
          name={'password'}
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
