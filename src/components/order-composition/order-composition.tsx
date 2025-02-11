import { FC } from 'react'

import { useParams } from 'react-router-dom'

export const OrderComposition: FC = () => {
  const { id = '' } = useParams<{ id: string }>()

  console.log(id)

  return <div>{id}</div>
}
