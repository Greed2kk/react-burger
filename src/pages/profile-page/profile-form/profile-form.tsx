import { FC } from 'react'

import AuthForm from '@/components/auth/auth-form/auth-form'

import {
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

const ProfileForm: FC = () => {
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
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={() => {}}
        value={'марк2'}
        name={'name'}
        size={'default'}
        extraClass="mb-6"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        icon={'EditIcon'}
      />

      <EmailInput
        onChange={() => {}}
        value={'1'}
        name={'Логин'}
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
