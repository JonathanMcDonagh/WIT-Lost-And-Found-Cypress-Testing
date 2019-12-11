const apiURL = 'https://api-witlostandfound-staging.herokuapp.com/items/'

describe('Lost Item page', () => {
  beforeEach(() => {
    cy.request(apiURL)
      .its('body')
      .then(items => {
        items.forEach(element => {
          cy.request('DELETE', `${apiURL}${element._id}`)
        })
      })
    cy.fixture('items').then(items => {
      let [d1, d2, d3, d4, ...rest] = items
      let four = [d1, d2, d3, d4]
      four.forEach(item => {
        cy.request('POST', apiURL, item)
      })
    })
    cy.visit('/')
    // Click Report Item in navbar
    cy.get('.navbar-nav')
      .eq(0)
      .find('.nav-item')
      .eq(2)
      .click()
  })
  describe('Add a item', () => {
    describe('With valid attributes', () => {
      it('allows item to be submitted', () => {
        //  Fill out web form
        cy.get('input[data-test=studentid]').type(20074520)
        cy.get('label')
          .contains('Name')
          .next()
          .type('J')
        cy.get('label')
          .contains('Name')
          .next()
          .type('onathan')
        cy.get('#WITBuilding').select('IT Building')
        cy.get('label')
          .contains('WIT Room Number')
          .next()
          .type('IT221')
        cy.get('label')
          .contains('Lost Item Description')
          .next()
          .type('Laptop Case')
        cy.contains('Thanks for your help!').should('not.exist')
        cy.get('.error').should('not.exist')
        cy.get('button[type=submit]').click()
        cy.contains('Thanks for your help!').should('exist')
      })
      after(() => {
        cy.wait(100)
        // Click manage items button
        cy.get('[data-test=manageitemsbtn]').click()
        cy.url().should('include', '/items')
      })
    })
  })
})
