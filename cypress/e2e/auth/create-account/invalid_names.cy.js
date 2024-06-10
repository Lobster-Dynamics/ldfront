describe("Create account invalid name", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/login");
		cy.get('a[data-test-id="signupLink"]').click();
	});

	it("navigate to create account page", () => {
		cy.url().should("include", "/create-account");
	});

	it("input invalid name and lastname", () => {
		// Input data
		cy.get('input[data-test-id="signupInputName"]').click().type("a");
		cy.get('input[data-test-id="signupInputLastname"]').click().type("a");
	});

	it("click on continue button", () => {
		// Input data
		cy.get('input[data-test-id="signupInputName"]').click().type("a");
		cy.get('input[data-test-id="signupInputLastname"]').click().type("a");

		// Click on continue button
		cy.get('button[data-test-id="signupButtonContinue"]').click();
	});

	it("error message is displayed", () => {
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
