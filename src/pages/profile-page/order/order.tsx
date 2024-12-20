import { FC } from 'react'

import { useParams } from 'react-router-dom'

const ProfileOrder: FC = () => {
  const { id = '' } = useParams<{ id: string }>()

  return <h1>{`Заказ №${id}`}</h1>
}

export default ProfileOrder
