import { ChangeEvent, FC, Fragment, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { useAppSelector } from '@/components/app/store/store'
import AuthActions from '@/components/auth/auth-actions/auth-actions'
import AuthForm from '@/components/auth/auth-form/auth-form'

import { getResetPasswordEmail } from '@/services/auth/selectors'

import { resetPasswordEmail, resetPasswordPath } from '@/utils/api/constants'
import { api } from '@/utils/api/request'
import { loginPath } from '@/utils/route-paths'

import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

const ResetPasswordPage: FC = () => {
  const navigate = useNavigate()
  const { token } = useParams()

  const [password, setPassword] = useState('')
  const [resetToken, setResetToken] = useState(token || '')
  const [validError, setValidError] = useState(false)
  const [error, setError] = useState(false)

  const resetEmail = useAppSelector(getResetPasswordEmail)

  useEffect(() => {
    if (!resetEmail) {
      navigate(loginPath)
    }
  }, [navigate, resetEmail])

  const onSubmit = (): void => {
    if (password && token && !validError) {
      api
        .post(resetPasswordPath, { password, token })
        .then(() => {
          localStorage.removeItem(resetPasswordEmail)
          navigate(loginPath)
        })
        .catch(() => {
          setError(true)
        })
    }
  }

  const toLogin = (): void => {
    navigate(loginPath)
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
    setValidError(false)
    setError(false)
  }

  const onChangeToken = (e: ChangeEvent<HTMLInputElement>): void => {
    setResetToken(e.target.value)
    setError(false)
  }

  const validationHandler = (isValid: boolean): void => {
    setValidError(!isValid)
  }

  return (
    <Fragment>
      <AuthForm
        title="Восстановление пароля"
        onSubmit={onSubmit}
        submitText="Сохранить"
        isLoading={!resetToken || !password || validError || error}
      >
        <PasswordInput
          onChange={onChangePassword}
          value={password}
          placeholder="Введите новый пароль"
          name="password"
          extraClass="mb-6"
          errorText="Некорректный пароль"
          checkValid={validationHandler}
        />

        {/* @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture warnings otherwise */}
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChangeToken}
          value={resetToken}
          name={'emailCode'}
          size={'default'}
          extraClass="mb-6"
          errorText="Некорректный токен"
          error={error}
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
