describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Shows a header', () => {
    cy.get('.vue-title').should('contain', 'WIT Lost And Found')
  })

  describe('Navigation bar', () => {
    it('Shows the required links', () => {
      cy.get('.navbar-nav')
        .eq(0)
        .within(() => {
          cy.get('.nav-item')
            .eq(0)
            .should('contain', 'Home')
          cy.get('.nav-item')
            .eq(1)
            .should('contain', 'Manage')
          cy.get('.nav-item')
            .eq(2)
            .should('contain', 'Report')
          cy.get('.nav-item')
            .eq(3)
            .should('contain', 'Map')
          cy.get('.nav-item')
            .eq(4)
            .should('contain', 'About')
        })
      cy.get('.navbar-nav')
        .eq(1)
        .within(() => {
          cy.get('.nav-item')
            .eq(0)
            .should('contain', '')
          cy.get('.nav-item')
            .eq(1)
            .should('contain', 'Account')
          cy.get('.nav-item')
            .eq(2)
            .should('contain', 'Sign')
          cy.get('.nav-item')
            .eq(3)
            .should('contain', 'Logout')
        })
    })

    it('Redirects when links are clicked', () => {
      cy.get('[data-test=lostitembtn]').click()
      cy.url().should('include', '/lostitem')
      cy.get('.navbar-nav')
        .eq(0)
        .find('.nav-item')
        .eq(1)
        .click()
      cy.url().should('include', '/items')
      cy.get('.navbar-nav')
        .eq(0)
        .find('.nav-item')
        .eq(2)
        .click()
      cy.url().should('include', '/lostitem')
      cy.get('.navbar-nav')
        .eq(0)
        .find('.nav-item')
        .eq(3)
        .click()
      cy.url().should('include', '/map')
      cy.get('.navbar-nav')
        .eq(0)
        .find('.nav-item')
        .eq(4)
        .click()
      cy.url().should('include', '/about')

      cy.get('.navbar-nav')
        .eq(1)
        .find('.nav-item')
        .eq(0)
        .click()
      cy.url().should('include', '') // When users email displays after logged in
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

      cy.get('[data-test=signupbtn]').click()
      cy.url().should('include', '/signup')

      cy.get('.navbar-nav')
        .eq(1)
        .find('.nav-item')
        .eq(3)
        .click()
      cy.url().should('include', '/')
    })
  })
})
