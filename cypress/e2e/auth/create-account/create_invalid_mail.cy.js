describe("Create account invalid mail", () => {
	it("Should display error message when mail is invalid", () => {
		// Visit create account page
		cy.visit("http://localhost:3000/create-account", {
			failOnStatusCode: false,
		});

		// Input data
		cy.get('input[data-test-id="signupInputName"]').click().type("Rodrigo");
		cy.get('input[data-test-id="signupInputLastname"]')
			.click()
			.type("Reyes");

		// Click on continue button to visit mail and password page
		cy.get('button[data-test-id="signupButtonContinue"]').click();

		// Input data mail and password
		cy.get('input[data-test-id="signupInputMail"]')
			.click()
			.type('rodrigo@mail');
		cy.get('input[data-test-id="signupInputPassword"]')
			.click()
			.type("123Aa/");
		cy.get("body").click();
		cy.get('input[data-test-id="signupInputRepeatPassword"]')
			.click()
			.type("123Aa/");
		cy.get("body").click();

		// Click on continue button to create account
		cy.get('button[data-test-id="signupButtonCreate"]').click();

		// Assert error message
		cy.get('div[id="swal2-html-container"')
			.last()
			.should("have.text", "El correo no es válido");
	});
});
