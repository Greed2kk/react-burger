import { Feed } from '@/services/feed-orders/types'
import { WebsocketStatus } from '@/services/middleware/socket-midleware'

export type ProfileOrdersSchema = {
  status: WebsocketStatus
  feed: Feed
  error: string | null
}
