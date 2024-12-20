import { FC, ReactNode } from 'react'

import classNames from 'classnames'

import { Button } from '@/components/button/button'
import { HtmlTypeButton, TypeButton } from '@/components/button/types'

import styles from './auth-form.module.css'

interface AuthFormProps {
  children: ReactNode
  title?: string
  onSubmit: () => void
  onCancel?: () => void
  submitText?: string
  cancelText?: string
  displayActions?: boolean
}

const AuthForm: FC<AuthFormProps> = ({
  children,
  title,
  onSubmit,
  submitText,
  onCancel,
  cancelText,
  displayActions = true,
}) => {
  const handleSubmit = (): void => {
    onSubmit()
  }

  const handleCancel = (): void => {
    onCancel && onCancel()
  }

  return (
    <form
      className={classNames(styles.authForm, 'mb-20')}
      onSubmit={handleSubmit}
    >
      {title && <p className="text text_type_main-medium mb-6">{title}</p>}
      {children}

      {displayActions && (
        <div className={styles.actions}>
          {cancelText && (
            <Button
              htmlType={HtmlTypeButton.BUTTON}
              type={TypeButton.SECONDARY}
              onClick={handleCancel}
            >
              {cancelText}
            </Button>
          )}

          <Button htmlType={HtmlTypeButton.SUBMIT}>{submitText}</Button>
        </div>
      )}
    </form>
  )
}

export default AuthForm
