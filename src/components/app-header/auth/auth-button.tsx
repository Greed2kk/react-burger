import { FC } from 'react'

import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import { Link } from '@/components/link/link'

import styles from '@/components/app-header/nav/nav.module.css'

export const AuthButton: FC = () => (
  <Link ariaLabel="Ссылка на личный кабинет" className="pl-5 pr-5 pt-4 pb-4">
    <ProfileIcon type="secondary" className="mr-2 ml-5" />
    <p
      className={classNames('text text_type_main-default', {
        [styles.inactive]: true, // refactor
      })}
    >
      Личный кабинет
    </p>
  </Link>
)
