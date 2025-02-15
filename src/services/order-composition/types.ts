
export type OrderComposition = {
  number: number
  name: string
  ingredients: string[]
  status: string
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
