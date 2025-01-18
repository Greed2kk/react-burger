import { ChangeEvent, FC, Fragment, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/components/app/store/store'
import AuthActions from '@/components/auth/auth-actions/auth-actions'
import AuthForm from '@/components/auth/auth-form/auth-form'
import { Button } from '@/components/button/button'

import { getResetPasswordEmail } from '@/services/auth/selectors'

import { forgotPasswordPath, resetPasswordEmail } from '@/utils/api/constants'
import { api } from '@/utils/api/request'
import { loginPath } from '@/utils/route-paths'

import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './forgot-password-page.module.css'

const ForgotPasswordPage: FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [disable, setDisable] = useState(false)
  const [validError, setValidError] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const resetEmail = useAppSelector(getResetPasswordEmail)

  const onSubmit = (): void => {
    if (!validError && email) {
      setDisable(true)

      api.post(forgotPasswordPath, { email }).then(() => {
        localStorage.setItem(resetPasswordEmail, email)
        setDisable(false)
        setEmailSent(true)
        setEmail('')
      })
    }
  }

  const resendEmail = (): void => {
    setDisable(false)
    setValidError(false)
    setEmailSent(false)
  }

  const validationHandler = (isValid: boolean): void => {
    setValidError(!isValid)
  }

  const toLogin = (): void => {
    navigate(loginPath)
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
    setValidError(false)
  }

  return (
    <Fragment>
      {emailSent ? (
        <div className={styles.tip}>
          <p className="text text_type_main-default">
            Письмо отправлено на почту
          </p>
          <p className="text text_type_main-medium mt-4">
            {email || resetEmail}
          </p>

          <Button extraClass="mt-4 mb-15" onClick={resendEmail}>
            Указать другую почту?
          </Button>
        </div>
      ) : (
        <AuthForm
          title="Восстановление пароля"
          onSubmit={onSubmit}
          submitText="Восстановить"
          isLoading={disable || !email || validError}
        >
          <EmailInput
            disabled={disable}
            onChange={handleEmailChange}
            value={email}
            name="email"
            isIcon={false}
            extraClass="mb-6"
            errorText="Неправильный адрес"
            checkValid={validationHandler}
          />
        </AuthForm>
      )}

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
