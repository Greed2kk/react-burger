describe('Drag and drop ingredient', () => {
  it('should drag bun', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-testid=ingredient]').first().as('ingredient')
    cy.get('[data-testid=constructor-bun-placeholder]')
      .first()
      .as('constructor-bun-placeholder')


    cy.get('@ingredient').trigger('dragstart')
    cy.wait(500)
    cy.get('@constructor-bun-placeholder').trigger('drop')
    cy.wait(500)

    cy.get('[data-testid=constructor-bun-bottom]').as('constructor-bun-bottom')
    cy.get('[data-testid=constructor-bun-top]').as('constructor-bun-top')
    cy.get('@constructor-bun-bottom').children().should('have.length', 1)
    cy.get('@constructor-bun-top').children().should('have.length', 1)
    cy.wait(3000)
  })


  it('should drag main', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-testid=ingredient]').eq(4).as('ingredient-main')
    cy.get('[data-testid=ingredient]').eq(5).as('ingredient-main-second')
    cy.get('[data-testid=constructor-main-placeholder]')
      .first()
      .as('constructor-main-placeholder')

    cy.get('@ingredient-main').trigger('dragstart')
    cy.wait(500)
    cy.get('@constructor-main-placeholder').trigger('drop')
    cy.wait(500)

    cy.get('[data-testid=constructor-main]')
      .first()
      .as('constructor-main')

    cy.get('@ingredient-main-second').trigger('dragstart')
    cy.wait(500)
    cy.get('@constructor-main').trigger('drop')
    cy.wait(500)

    cy.get('[data-testid=constructor-main]').as('constructor-main')
    cy.get('@constructor-main').children().should('have.length', 2)
  })
})
