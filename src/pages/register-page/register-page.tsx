import { FC, Fragment } from 'react'

import { useNavigate } from 'react-router-dom'

import AuthActions from '@/components/auth/auth-actions/auth-actions'
import AuthForm from '@/components/auth/auth-form/auth-form'

import { loginPath } from '@/utils/route-paths'

import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

const RegisterPage: FC = () => {
  const navigate = useNavigate()

  const onSubmit = (): void => {
    console.log('call')
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
      >
        <PasswordInput
          onChange={() => {}}
          value=""
          placeholder="Введите новый пароль"
          name="password"
          extraClass="mb-6"
        />

        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={() => {}}
          value=""
          name="name"
          size="default"
          extraClass="mb-6"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
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
