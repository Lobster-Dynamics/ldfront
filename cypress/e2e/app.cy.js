describe('Navigation', () => {
    it('should navigate to the about page', () => {
      // login
      cy.visit('http://localhost:3000/file-explorer', { failOnStatusCode: false })
   
      // input mail
      cy.get('input[data-test-id="usernameInputLogin"]').click().type("adrian.hernandez.p0@gmail.com")
      cy.get('input[data-test-id="passwordInputLogin"]').click().type("cocoloco")
      cy.get('button[data-test-id="loginButton"]').click()
    })
})