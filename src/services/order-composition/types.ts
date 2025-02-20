export type OrderStatus = 'created' | 'pending' | 'done'

export type OrderComposition = {
  number: number
  name: string
  ingredients: string[]
  status: OrderStatus
  createdAt: string
}

export type OrderCompositionSchema = {
  orderComposition: OrderComposition
  isLoading?: boolean
  error?: string
}

export type OrderCompositionResponse = {
  orders: OrderComposition[]
}
