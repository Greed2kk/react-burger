import classNames from 'classnames'
import React from 'react'

import { IngredientItem as IngredientItemType } from '../ingredients-list'

import IngredientCard from './ingredient-card/ingredient-card'

import styles from './ingredients-items.module.css'

interface IngredientsItemsProps {
  categoryIngredients: IngredientItemType[]
}

class IngredientsItems extends React.Component<IngredientsItemsProps, {}> {
  render() {
    const { categoryIngredients } = this.props

    return (
      <section
        className={classNames(styles.ingredientsItems, 'pt-6 pl-4 pb-10 pr-4')}
      >
        {categoryIngredients.map((item) => (
          <IngredientCard key={item._id} item={item} />
        ))}
      </section>
    )
  }
}

export default IngredientsItems
