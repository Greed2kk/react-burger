import { SELECTORS } from '../support/constants'


describe('Drag and drop ingredient', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.get(SELECTORS.INGREDIENT).eq(4).as('ingredientMain')
    cy.get(SELECTORS.INGREDIENT).eq(5).as('ingredientMainSecond')
    cy.get(SELECTORS.INGREDIENT).first().as('ingredient')

    cy.get('[data-testid=constructor-bun-placeholder]').as(
      'constructorBunPlaceholder',
    )
    cy.get('[data-testid=constructor-main-placeholder]').as(
      'constructorMainPlaceholder',
    )
    cy.get('[data-testid=constructor-main]').first().as('constructorMain')
  })

  it('should drag bun', () => {
    cy.dragAndDrop('@ingredient', '@constructorBunPlaceholder').as(
      'dragAndDrop',
    )

    cy.get('[data-testid=constructor-bun-bottom]')
      .children()
      .should('have.length', 1)
    cy.get('[data-testid=constructor-bun-top]')
      .children()
      .should('have.length', 1)
  })

  it('should drag main', () => {
    cy.dragAndDrop('@ingredientMain', '@constructorMainPlaceholder')
    cy.dragAndDrop('@ingredientMainSecond', '@constructorMain')

    cy.get('[data-testid=constructor-main]').children().should('have.length', 2)
  })
})
