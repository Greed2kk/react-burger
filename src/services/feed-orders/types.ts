import { WebsocketStatus } from '@/services/middleware/socket-midleware'
import { OrderStatus } from '@/services/order-composition/types'

export type Order = {
  _id: string
  ingredients: string[]
  status: OrderStatus
  name: string
  createdAt: string
  updatedAt: string
  number: number
}

export interface Feed {
  success: boolean
  orders: Order[]
  total: number
  totalToday: number
}

export type FeedOrdersSchema = {
  status: WebsocketStatus
  feed: Feed
  error: string | null
}
