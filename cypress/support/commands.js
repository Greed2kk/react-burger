Cypress.Commands.add('dragAndDrop', (item, target) => {
  cy.get(item).trigger('dragstart')
  cy.get(target).trigger('drop')
})
