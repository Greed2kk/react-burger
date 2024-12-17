import { FC, ReactNode } from 'react'

import classNames from 'classnames'

import { Button } from '@/components/button/button'
import { HtmlTypeButton } from '@/components/button/types'

import styles from './auth-form.module.css'

interface AuthFormProps {
  children: ReactNode
  title: string
  submitText: string
  onSubmit: () => void
}

const AuthForm: FC<AuthFormProps> = ({
  children,
  title,
  onSubmit,
  submitText,
}) => {
  const handleSubmit = (): void => {
    onSubmit()
  }

  return (
    <form
      className={classNames(styles.authForm, 'mb-20')}
      onSubmit={handleSubmit}
    >
      <p className="text text_type_main-medium mb-6">{title}</p>
      {children}

      <Button htmlType={HtmlTypeButton.SUBMIT}>{submitText}</Button>
    </form>
  )
}

export default AuthForm
