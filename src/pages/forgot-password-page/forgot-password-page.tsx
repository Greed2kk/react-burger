import { FC, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'

import AuthActions from '@/components/auth/auth-actions/auth-actions'
import AuthForm from '@/components/auth/auth-form/auth-form'
import { loginPath } from '@/utils/route-paths'


const ForgotPasswordPage: FC = () => {
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
        submitText="Восстановить"
      >
        <EmailInput
          onChange={() => {}}
          value={''}
          name={'email'}
          isIcon={false}
          extraClass="mb-6"
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

export default ForgotPasswordPage
