describe("Create account empty name", () => {
	it("Should display error message when names are empty", () => {
		// Visit create account page
		cy.visit("http://localhost:3000/create-account", {
			failOnStatusCode: false,
		});

		// Click on continue button
		cy.get('button[data-test-id="signupButtonContinue"]').click();

		// Assert error message
		cy.get('div[id="swal2-html-container"')
			.last()
			.should("have.text", "Debes completar todos los campos");
	});
});
