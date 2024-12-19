import { FC, Fragment } from 'react'

import { useNavigate } from 'react-router-dom'

import AuthActions from '@/components/auth/auth-actions/auth-actions'
import AuthForm from '@/components/auth/auth-form/auth-form'

import { loginPath } from '@/utils/route-paths'

import {
  EmailInput,
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
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={() => {}}
          value={''}
          name={'name'}
          size={'default'}
          extraClass="mb-6"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />

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
