describe('transaction Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')
    cy.get('td').first().click()
  })

  describe('given transaction screen', () => {
    it('should show transaction details', () => {
      cy.get('[data-testid="transaction-header"]').contains('Transaction details')
    })

    it('should update an transaction', () => {
      let selectedValue = ''
      cy.get('[data-testid="select-category"]').select(0)

      cy.get('[data-testid="select-category"] option[value]').then($el => {
        selectedValue = $el.val()
      })

      cy.intercept('/v1/graphql').as("updateTransaction");

      cy.get('[data-testid="submit-transaction"]').click()

      cy.wait("@updateTransaction").then(interception => {
        const body = interception.request.body
        expect(body.variables.categoryId).to.eq(selectedValue)
      })
    })

    it('should open option to create a category', () => {
      cy.get('[data-testid="select-category"]').select('new')
      cy.get('[data-testid="input-new-category"]').should('exist')
    })

    it('should open option to create a category and block submit button', () => {
      cy.get('[data-testid="select-category"]').select('new')
      cy.get('[data-testid="input-new-category"]').should('exist')
      cy.get('[data-testid="submit-transaction"]').should('be.disabled')
      cy.get('[data-testid="submit-new-category"]').should('be.disabled')
    })

    it('should create a new category', () => {
      const newCategoryName = 'test cypress new category'
      cy.get('[data-testid="select-category"]').select('new')
      cy.get('[data-testid="input-category"]').type(newCategoryName)

      cy.intercept('/v1/graphql').as("updateTransaction");

      cy.get('[data-testid="submit-new-category"]').click()

      cy.wait("@updateTransaction").then(interception => {
        const body = interception.request.body
        expect(body.variables.name).to.eq(newCategoryName)
      })
    })
  })
})