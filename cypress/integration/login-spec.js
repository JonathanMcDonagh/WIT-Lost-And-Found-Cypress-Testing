describe('Lost Item page', () => {
  beforeEach(() => {
    cy.visit('/')
    // Click Report Item in navbar
    cy.get('.navbar-nav')
      .eq(1)
      .find('.nav-item')
      .eq(1)
      .click()
    cy.url().should('include', '/')
    cy.get('.navbar-nav')
      .eq(1)
      .find('.nav-item')
      .eq(2)
      .click()
    cy.url().should('include', '/Login')
  })
  describe('Tests user login', () => {
    describe('With valid attributes', () => {
      it('allows user to be logged in', () => {
        //  Fill out web form
        cy.get('input[data-test=email]').type('20074520@mail.wit.ie')
        cy.get('input[data-test=password]').type('agile123')
        cy.get('button[type=submit]').click()
      })
      after(() => {
        cy.wait(100)
        // Click manage items button
        cy.get('[data-test=loginbtn]').click()
        cy.url().should('include', '/#/#/')
      })
    })
  })
})
