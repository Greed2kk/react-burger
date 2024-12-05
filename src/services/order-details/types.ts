export interface OrderDetailsSchema extends OrderDetails {
  isLoading?: boolean
  error?: string
}

export type Order = { number: number | null }

export interface OrderDetails {
  orderDetails: OrderResponse
}

export interface OrderResponse {
  name: string
  order: Order
  success: boolean
}
