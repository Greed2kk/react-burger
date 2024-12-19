import { FC } from 'react'

import { Button } from '@/components/button/button'
import {
  HtmlTypeButton,
  SizeButton,
  TypeButton,
} from '@/components/button/types'

import styles from './auth-actions.module.css'

type AuthAction = {
  text: string
  action: {
    text: string
    onClick: () => void
  }
}

interface AuthActionsProps {
  actions: AuthAction[]
}

const AuthActions: FC<AuthActionsProps> = ({ actions }) => (
  <section className={styles.authActions}>
    {actions.map(({ text, action }, index) => (
      <span className={styles.authAction} key={index}>
        <p className="text text_type_main-default text_color_inactive">
          {text}
        </p>

        <Button
          htmlType={HtmlTypeButton.BUTTON}
          type={TypeButton.SECONDARY}
          size={SizeButton.MEDIUM}
          extraClass={styles.resetPadding}
          onClick={action.onClick}
        >
          {action.text}
        </Button>
      </span>
    ))}
  </section>
)

export default AuthActions
