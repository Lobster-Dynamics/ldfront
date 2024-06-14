describe("Create account invalid mail", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/login");
		cy.get('a[data-test-id="signupLink"]').click();
	});

	it("navigate to create account page", () => {
		cy.url().should("include", "/create-account");
	});

	it("input name and lastname", () => {
		// Input data name and lastname
		cy.get('input[data-test-id="signupInputName"]').click().type("Rodrigo");
		cy.get('input[data-test-id="signupInputLastname"]')
			.click()
			.type("Reyes");
	});

	it("click on continue button for next step", () => {
		// Input data name and lastname
		cy.get('input[data-test-id="signupInputName"]').click().type("Rodrigo");
		cy.get('input[data-test-id="signupInputLastname"]')
			.click()
			.type("Reyes");

		// Click on continue button
		cy.get('button[data-test-id="signupButtonContinue"]').click();
	});

	it("input invalid email", () => {
		// Input data name and lastname
		cy.get('input[data-test-id="signupInputName"]').click().type("Rodrigo");
		cy.get('input[data-test-id="signupInputLastname"]')
			.click()
			.type("Reyes");

		// Click on continue button
		cy.get('button[data-test-id="signupButtonContinue"]').click();

		// Input invalid mail
		cy.get('input[data-test-id="signupInputMail"]')
			.click()
			.type("rodrigo@mail");
	});

	it("click on create account button", () => {
		// Input data name and lastname
		cy.get('input[data-test-id="signupInputName"]').click().type("Rodrigo");
		cy.get('input[data-test-id="signupInputLastname"]')
			.click()
			.type("Reyes");

		// Click on continue button
		cy.get('button[data-test-id="signupButtonContinue"]').click();

		// Input invalid mail
		cy.get('input[data-test-id="signupInputMail"]')
			.click()
			.type("rodrigo@mail");

		// Click on create account button
		cy.get('button[data-test-id="signupButtonCreate"]').click();
	});

	it("error message is displayed", () => {
		// Input data name and lastname
		cy.get('input[data-test-id="signupInputName"]').click().type("Rodrigo");
		cy.get('input[data-test-id="signupInputLastname"]')
			.click()
			.type("Reyes");

		// Click on continue button
		cy.get('button[data-test-id="signupButtonContinue"]').click();

		// Input invalid mail
		cy.get('input[data-test-id="signupInputMail"]')
			.click()
			.type("rodrigo@mail");

		// Click on create account button
		cy.get('button[data-test-id="signupButtonCreate"]').click();

		// Assert error message
		cy.get('div[id="swal2-html-container"')
			.last()
			.should("have.text", "El correo no es válido");
	});
});
