describe('Click ingredient interaction', () => {
  it('should open modal after click ingredient', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-testid=ingredient]').first()
    cy.get('[data-testid=ingredient]').first().click()
    cy.get('[data-testid=modal]').should('be.visible')
  })

  it('should open modal and close', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-testid=ingredient]').first()
    cy.get('[data-testid=ingredient]').first().click()
    cy.get('[data-testid=modal]').should('be.visible')
    cy.wait(3000)
    cy.get('[data-testid=modal-close-btn]').click()
    cy.wait(1000)
    cy.get('[data-testid=modal]').should('not.exist')
  })

  it('should display correct data', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-testid=ingredient]')
      .first()
      .contains('Краторная булка N-200i')
    cy.get('[data-testid=ingredient]').first().click()
    cy.get('[data-testid=ingredient-details-name]').contains(
      'Краторная булка N-200i',
    )
    cy.get('[data-testid=modal]').should('be.visible')
  })
})
