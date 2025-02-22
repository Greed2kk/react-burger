import { SELECTORS } from '../support/constants'

describe('Order complete success', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' })
    cy.intercept('GET', 'api/orders', { fixture: 'order.json' }).as('postOrder')

    window.localStorage.setItem('refresh-token', JSON.stringify('FaS12EASD12'))
    window.localStorage.setItem(
      'access-token',
      JSON.stringify('FaS12EAS123D12'),
    )

    cy.get(SELECTORS.INGREDIENT).eq(4).as('ingredientMain')
    cy.get(SELECTORS.INGREDIENT).eq(5).as('ingredientMainSecond')
    cy.get(SELECTORS.INGREDIENT).first().as('bun')

    cy.get('[data-testid=constructor-bun-placeholder]').as(
      'constructorBunPlaceholder',
    )
    cy.get('[data-testid=constructor-main-placeholder]').as(
      'constructorMainPlaceholder',
    )
    cy.get('[data-testid=constructor-main]').as('constructorMain')
    cy.get('[data-testid=complete-order-btn]').as('completeOrderBtn')
  })

  it('should add ingredients and get order number', () => {
    cy.dragAndDrop('@bun', '@constructorBunPlaceholder')
    cy.dragAndDrop('@ingredientMain', '@constructorMainPlaceholder')
    cy.dragAndDrop('@ingredientMainSecond', '@constructorMain')

    cy.get('@completeOrderBtn').click()

    cy.get(SELECTORS.MODAL).should('be.visible')
  })
})
