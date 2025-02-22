describe('Order complete success', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' })
    cy.intercept('GET', 'api/orders', { fixture: 'order.json' }).as('postOrder')

    window.localStorage.setItem(
      'refresh-token', JSON.stringify('FaS12EASD12')
    )
    window.localStorage.setItem(
      'access-token', JSON.stringify('FaS12EAS123D12')
    )
  })

  it('should add ingredients and get order number ', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-testid=ingredient]').first().as('ingredient')
    cy.get('[data-testid=constructor-bun-placeholder]')
      .first()
      .as('constructor-bun-placeholder')

    cy.get('@ingredient').trigger('dragstart')
    cy.wait(500)
    cy.get('@constructor-bun-placeholder').trigger('drop')
    cy.wait(500)

    cy.get('[data-testid=ingredient]').eq(4).as('ingredient-main')
    cy.get('[data-testid=ingredient]').eq(5).as('ingredient-main-second')
    cy.get('[data-testid=constructor-main-placeholder]')
      .first()
      .as('constructor-main-placeholder')

    cy.get('@ingredient-main').trigger('dragstart')
    cy.wait(500)
    cy.get('@constructor-main-placeholder').trigger('drop')
    cy.wait(500)

    cy.get('[data-testid=constructor-main]').first().as('constructor-main')

    cy.get('@ingredient-main-second').trigger('dragstart')
    cy.wait(500)
    cy.get('@constructor-main').trigger('drop')
    cy.wait(500)

    cy.get('[data-testid=complete-order-btn]').click()

    cy.get('[data-testid=modal]').should('be.visible')
  })
})
