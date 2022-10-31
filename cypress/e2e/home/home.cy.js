describe('Home Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')
  })

  describe('given home screen', () => {
    it('should show table with transactions', () => {
      cy.get('table').should('exist')
    })

    it('should correctly internationalize app', () => {
      cy.get('[data-testid="select-i18n"]').select('br')
      cy.location('pathname').should('eq', '/br')
      cy.get('[data-testid="input-icon-search"]').invoke("prop","placeholder")
      .should("contain", "Pesquise por banco, conta, referência, categoria, data, quantia, moeda...");
    })

    it('account should be disabled without selecting an bank', () => {
      cy.get('[data-testid="select-account"]').should('be.disabled')
    })

    it('account should be enabled after selecting an bank', () => {
      cy.get('[data-testid="select-bank"]').select(1)
      cy.get('[data-testid="select-account"]').should('not.be.disabled')
    })

    it('should search new transaction when input debounce ends', () => {
      cy.get('[data-testid="input-icon-search"]').type('test')

      cy.intercept('/v1/graphql').as("search");

      cy.wait("@search").then(interception => {
        const body = interception.request.body
        expect(body.variables.search).to.eq('test')
      })
    })

    it('should go to transaction details when clicking on table row', () => {
      cy.get('td').first().click()
      cy.location('pathname').should('eq', '/transaction')
    })
  })
})