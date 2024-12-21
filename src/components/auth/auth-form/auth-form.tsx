import { FC, FormEvent, ReactNode } from 'react'

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
  isLoading?: boolean
}

const AuthForm: FC<AuthFormProps> = ({
  children,
  title,
  onSubmit,
  submitText,
  onCancel,
  cancelText,
  displayActions = true,
  isLoading = false,
}) => {
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()

    onSubmit()
  }

  const handleCancel = (): void => {
    onCancel && onCancel()
  }

  return (
    <form
      className={classNames(styles.authForm, 'mb-20')}
      onSubmit={handleSubmit}
      method="POST"
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

          <Button htmlType={HtmlTypeButton.SUBMIT} disabled={isLoading}>
            {submitText}
          </Button>
        </div>
      )}
    </form>
  )
}

export default AuthForm
