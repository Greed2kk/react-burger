import { ChangeEvent, FC, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/components/app/store/store'
import AuthForm from '@/components/auth/auth-form/auth-form'

import { setUserEmail, setUserName } from '@/services/auth/auth-slice'
import { getAuthUser } from '@/services/auth/selectors'
import { user } from '@/services/auth/user'

import {
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

const ProfileForm: FC = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(getAuthUser)
  const [disableName, setDisableName] = useState(true)
  // const isLoading = useAppSelector(getAuthLoading)

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setUserName({ name: e.target.value }))
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setUserEmail({ email: e.target.value }))
  }

  useEffect(() => {
    console.log('call')

    dispatch(user())
  }, [dispatch])

  console.log(data)

  const onSubmit = (): void => {
    console.log('submit')
  }

  const onCancel = (): void => {
    console.log('clear')
  }

  return (
    <AuthForm
      onSubmit={onSubmit}
      submitText="Сохранить"
      onCancel={onCancel}
      cancelText="Отмена"
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
        icon="EditIcon"
        onIconClick={() => setDisableName(!disableName)}
        disabled={disableName}
      />

      <EmailInput
        onChange={handleEmailChange}
        value={data?.email || ''}
        name="Логин"
        isIcon={true}
        extraClass="mb-6"
      />

      <PasswordInput
        onChange={() => {}}
        value="1"
        placeholder="Пароль"
        name="password"
        extraClass="mb-6"
        icon={'EditIcon'}
      />
    </AuthForm>
  )
}

export default ProfileForm
