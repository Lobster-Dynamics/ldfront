describe("Create account invalid name", () => {
	it("Should display error message when name or lastname are invalid", () => {
		// Visit create account page
		cy.visit("http://localhost:3000/create-account", {
			failOnStatusCode: false,
		});

		// Input data
		cy.get('input[data-test-id="signupInputName"]').click().type("a");
		cy.get('input[data-test-id="signupInputLastname"]').click().type("a");

		// Click on continue button
		cy.get('button[data-test-id="signupButtonContinue"]').click();

		// Assert error message
		cy.get('div[id="swal2-html-container"')
			.last()
			.should(
				"have.text",
				"El nombre y Apellido deben tener al menos 2 caracteres",
			);
	});
});
