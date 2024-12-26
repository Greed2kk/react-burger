import { FC, Fragment } from 'react'

import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import { profileOrdersPath } from '@/utils/route-paths'

import styles from './orders.module.css'

const ProfileOrders: FC = () => (
  <Fragment>
    <div className={styles.orders}>
      <h1>Заказы:</h1>

      <ul>
        <li>
          <NavLink to={`${profileOrdersPath}/1`}>Заказ №1</NavLink>
        </li>
      </ul>
    </div>

    <p
      className={classNames(
        styles.tip,
        'text text_type_main-default text_color_inactive',
      )}
    >
      В этом разделе вы можете просмотреть свою историю заказов
    </p>
  </Fragment>
)

export default ProfileOrders
