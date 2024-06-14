describe("Create account empty name", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/login");
		cy.get('a[data-test-id="signupLink"]').click();
	});

	it("navigate to create account page", () => {
		cy.url().should("include", "/create-account");
	});

    it('click on continue button for next step', () => {
        // Click on continue button
        cy.get('button[data-test-id="signupButtonContinue"]').click();
    });

    it('error message is displayed', () => {
        // Click on continue button
        cy.get('button[data-test-id="signupButtonContinue"]').click();

        // Assert error message
        cy.get('div[id="swal2-html-container"').last().should('have.text', 'Debes completar todos los campos');
    });
});
