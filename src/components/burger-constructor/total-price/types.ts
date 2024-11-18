import { Ingredients } from '../../pages/burger-constructor-page/types'

export interface OrderData {
  id: string
  status: string
  recommendation: string
  ingredients: Ingredients[]
}