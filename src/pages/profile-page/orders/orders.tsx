import { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { profileOrdersPath } from '@/utils/route-paths'

const ProfileOrders: FC = () => (
  <div>
    <h1>Заказы:</h1>

    <ul>
      <li>
        <NavLink to={`${profileOrdersPath}/1`}>Заказ №1</NavLink>
      </li>
    </ul>

  </div>
)

export default ProfileOrders
