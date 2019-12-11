const apiURL = 'https://api-witlostandfound-staging.herokuapp.com/items/'

describe('Manage Items page', () => {
  beforeEach(() => {
    // Delete all items in the API's datastore
    cy.request(apiURL)
      .its('body')
      .then(items => {
        items.forEach(element => {
          cy.request('DELETE', `${apiURL}${element._id}`)
        })
      })
    // Populate API's datastore
    cy.fixture('items').then(items => {
      let [d1, d2, d3, d4, ...rest] = items
      let four = [d1, d2, d3, d4]
      four.forEach(item => {
        cy.request('POST', apiURL, item)
      })
    })
    cy.visit('/')
    // Click Manage items navbar link
    cy.get('.navbar-nav')
      .eq(0)
      .find('.nav-item')
      .eq(1)
      .click()
  })
  describe('To like an item operation', () => {
    it('increases the no. of likes by 1', () => {
      cy.get('tbody')
        .find('tr')
        .should('have.length', 8) // Set to current number of items in the list
      // Click delete link of 3rd item in list
      cy.get('tbody')
        .find('tr')
        .eq(2)
        .find('td')
        .eq(7)
        .find('a')
        .click()
      cy.get('tbody')
        .find('tr')
    })
  })
  describe('For a confirmed delete operation', () => {
    it('reduces the no. of items by 1', () => {
      cy.get('tbody')
        .find('tr')
        .should('have.length', 8) // Set to current number of items in the list
      // Clicks delete link of 3rd item in list
      cy.get('tbody')
        .find('tr')
        .eq(2)
        .find('td')
        .eq(9)
        .find('a')
        .click()
      // Click confirmation button
      cy.get('button')
        .contains('Delete')
        .click()
      cy.get('tbody')
        .find('tr')
        .should('have.length', 7)
    })
  })
})
