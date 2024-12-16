import { FC, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import AuthActions from '@/components/auth/auth-actions/auth-actions'
import AuthForm from '@/components/auth/auth-form/auth-form'
import { loginPath } from '@/utils/route-paths'


const ResetPasswordPage: FC = () => {
  const navigate = useNavigate()

  const onSubmit = (): void => {
    console.log('call')
  }

  const toLogin = (): void => {
    navigate(loginPath)
  }

  return (
    <Fragment>
      <AuthForm
        title="Восстановление пароля"
        onSubmit={onSubmit}
        submitText="Сохранить"
      >
        <PasswordInput
          onChange={() => {}}
          value={''}
          placeholder="Введите новый пароль"
          name="password"
          extraClass="mb-6"
        />

        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={() => {}}
          value={''}
          name={'emailCode'}
          size={'default'}
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
              onClick: toLogin,
            },
          },
        ]}
      />
    </Fragment>
  )
}

export default ResetPasswordPage
