describe('Click ingredient interaction', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-testid=ingredient]').first().as('firstIngredient')
  })

  it('should open modal after clicking ingredient', () => {
    cy.get('@firstIngredient').click()
    cy.get('[data-testid=modal]').should('be.visible')
  })

  it('should open modal and close', () => {
    cy.get('@firstIngredient').click()
    cy.get('[data-testid=modal]').should('be.visible')

    cy.get('[data-testid=modal-close-btn]').click()
    cy.get('[data-testid=modal]').should('not.exist')
  })

  it('should display correct data', () => {
    const ingredientName = 'Краторная булка N-200i'

    cy.get('@firstIngredient').contains(ingredientName)
    cy.get('@firstIngredient').click()
    cy.get('[data-testid=ingredient-details-name]').contains(ingredientName)
    cy.get('[data-testid=modal]').should('be.visible')
  })
})
