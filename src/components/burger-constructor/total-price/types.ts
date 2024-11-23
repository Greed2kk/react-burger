import { Ingredients } from '../../../services/ingredients/types'

export interface OrderData {
  id: string
  status: string
  recommendation: string
  ingredients: Ingredients[]
}
