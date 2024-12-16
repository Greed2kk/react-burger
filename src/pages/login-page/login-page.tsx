import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import { Button } from '@/components/button/button'
import { registerPath } from '@/utils/route-paths'

import styles from './login-page.module.css'

import {
  HtmlTypeButton,
  SizeButton,
  TypeButton,
} from '@/components/button/types'

const LoginPage: FC = () => {
  const navigate = useNavigate()

  const onSubmit = (): void => {
    console.log('call')
  }

  const toRegistration = (): void => {
    navigate(registerPath)
  }

  return (
    <div className={styles.loginPage}>
      <form
        className={classNames(styles.loginForm, 'mb-20')}
        onSubmit={onSubmit}
      >
        <p className="text text_type_main-medium mb-6">Вход</p>

        <EmailInput
          onChange={() => {}}
          value={''}
          name={'email'}
          isIcon={false}
          extraClass="mb-6"
        />

        <PasswordInput
          onChange={() => {}}
          value={''}
          name={'password'}
          extraClass="mb-6"
        />

        <Button htmlType={HtmlTypeButton.SUBMIT}>Войти</Button>
      </form>

      <section className={styles.loginActions}>
        <span className={styles.loginAction}>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </p>

          <Button
            htmlType={HtmlTypeButton.BUTTON}
            type={TypeButton.SECONDARY}
            size={SizeButton.MEDIUM}
            extraClass={styles.resetPadding}
            onClick={toRegistration}
          >
            Зарегистрироваться
          </Button>
        </span>

        <span className={styles.loginAction}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>

          <Button
            htmlType={HtmlTypeButton.BUTTON}
            type={TypeButton.SECONDARY}
            size={SizeButton.MEDIUM}
            extraClass={styles.resetPadding}
          >
            Восстановить пароль
          </Button>
        </span>
      </section>
    </div>
  )
}

export default LoginPage
