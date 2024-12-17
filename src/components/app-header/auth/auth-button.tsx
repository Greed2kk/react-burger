import { FC } from 'react'

import { Link } from '@/components/link/link'

import { profilePath } from '@/utils/route-paths'

import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export const AuthButton: FC = () => (
  <Link
    ariaLabel="Ссылка на личный кабинет"
    className="pl-5 pr-5 pt-4 pb-4"
    to={profilePath}
  >
    <ProfileIcon type="secondary" className="mr-2 ml-5" />
    <p className="text text_type_main-default">Личный кабинет</p>
  </Link>
)
