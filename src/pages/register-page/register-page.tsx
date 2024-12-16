import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import { Button } from '@/components/button/button'
import { loginPath } from '@/utils/route-paths'

import styles from './register-page.module.css'

import {
  HtmlTypeButton,
  SizeButton,
  TypeButton,
} from '@/components/button/types'

const RegisterPage: FC = () => {
  const navigate = useNavigate()

  const handleSubmit = (): void => {
    console.log('call')
  }

  const toLoginPage = (): void => {
    navigate(loginPath)
  }

  return (
    <div className={styles.registerPage}>
      <form
        className={classNames(styles.registerForm, 'mb-20')}
        onSubmit={handleSubmit}
      >
        <p className="text text_type_main-medium mb-6">Регистрация</p>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={() => {}}
          value={''}
          name={'name'}
          size={'default'}
          extraClass="mb-6"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />

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

        <Button htmlType={HtmlTypeButton.SUBMIT}>Зарегистрироваться</Button>
      </form>

      <section className={styles.registerActions}>
        <span className={styles.registerAction}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>

          <Button
            htmlType={HtmlTypeButton.BUTTON}
            type={TypeButton.SECONDARY}
            size={SizeButton.MEDIUM}
            extraClass={styles.resetPadding}
            onClick={toLoginPage}
          >
            Войти
          </Button>
        </span>
      </section>
    </div>
  )
}

export default RegisterPage
