import React from 'react'

import PropTypes from 'prop-types'

import { IngredientType } from '../burger-ingredients'
import IngredientsCategory from './ingredients-category/Ingredients-category'

export interface Categories {
  [IngredientType.BUN]: IngredientItem['_id'][]
  [IngredientType.MAIN]: IngredientItem['_id'][]
  [IngredientType.SAUCE]: IngredientItem['_id'][]
}

export type IngredientItem = {
  _id: string
  name: string
  type: IngredientType
  price: number
  image: string
  __v: number
}

interface IngredientsListProps {
  ingredients: IngredientItem[]
}

class IngredientsList extends React.Component<IngredientsListProps, {}> {
  static propTypes = {
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
      })
    ),
  }

  render() {
    const categories: Categories = {
      [IngredientType.BUN]: [],
      [IngredientType.MAIN]: [],
      [IngredientType.SAUCE]: [],
    }

    const { ingredients } = this.props

    ingredients.forEach(({ type, _id }) => categories[type].push(_id))

    return (
      <section>
        {Object.entries(categories).map(([category, itemsId]) => {
          return (
            <IngredientsCategory
              key={category}
              category={category as IngredientType}
              itemsId={itemsId}
              ingredients={ingredients}
            />
          )
        })}
      </section>
    )
  }
}

export default IngredientsList
