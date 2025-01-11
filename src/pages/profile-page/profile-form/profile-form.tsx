import { ChangeEvent, FC, Fragment, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/components/app/store/store'
import AuthForm from '@/components/auth/auth-form/auth-form'

import {
  resetFormData,
  setUserEmail,
  setUserName,
  setUserPassword,
} from '@/services/auth/auth-slice'
import {
  getAuthLoading,
  getAuthUserForm,
  getChangedData,
  getFormIsChanged,
} from '@/services/auth/selectors'
import { user } from '@/services/auth/user'
import { userUpdate } from '@/services/auth/user-update'

import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

const ProfileForm: FC = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(getAuthUserForm)
  const [disableName, setDisableName] = useState(true)
  const [disableEmail, setDisableEmail] = useState(true)
  const isLoading = useAppSelector(getAuthLoading)

  const changedData = useAppSelector(getChangedData)

  const formIsChanged = useAppSelector(getFormIsChanged)

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setUserName({ name: e.target.value }))
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setUserEmail({ email: e.target.value }))
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setUserPassword({ password: e.target.value }))
  }

  useEffect(() => {
    dispatch(user())
  }, [dispatch])

  const onSubmit = (): void => {
    setDisableName(true)
    setDisableEmail(true)
    dispatch(userUpdate(changedData))
  }

  const onCancel = (): void => {
    dispatch(resetFormData())
    setDisableName(true)
    setDisableEmail(true)
  }

  return (
    <Fragment>
      {isLoading ? (
        <h1 style={{ gridArea: 'right' }}>Загрузка...</h1>
      ) : (
        <AuthForm
          onSubmit={onSubmit}
          submitText="Сохранить"
          onCancel={onCancel}
          cancelText="Отмена"
          displayActions={formIsChanged}
        >
          {/* @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture warnings otherwise */}
          <Input
            type="text"
            placeholder="Имя"
            onChange={handleUserNameChange}
            value={data?.name || ''}
            name="name"
            size="default"
            extraClass="mb-6"
            icon={disableName ? 'EditIcon' : 'CloseIcon'}
            onIconClick={() => setDisableName(!disableName)}
            disabled={disableName}
          />

          {/* @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture warnings otherwise */}

          <Input
            type="text"
            placeholder="Логин"
            name="email"
            size="default"
            onChange={handleEmailChange}
            value={data?.email || ''}
            icon={disableEmail ? 'EditIcon' : 'CloseIcon'}
            onIconClick={() => setDisableEmail(!disableEmail)}
            extraClass="mb-6"
            disabled={disableEmail}
          />

          <PasswordInput
            onChange={handlePasswordChange}
            value={data?.password || '123456'}
            placeholder="Пароль"
            name="password"
            extraClass="mb-6"
            icon="EditIcon"
          />
        </AuthForm>
      )}

      <p className="text text_type_main-default text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </Fragment>
  )
}

export default ProfileForm
