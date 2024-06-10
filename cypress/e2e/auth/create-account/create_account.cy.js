describe("Create account", () => {
	it("Should create new account successfully", () => {
		// Visit create account page
		cy.visit("http://localhost:3000/create-account", {
			failOnStatusCode: false,
		});

		// Input data name and lastname
		cy.get('input[data-test-id="signupInputName"]').click().type("Rodrigo");
		cy.get('input[data-test-id="signupInputLastname"]')
			.click()
			.type("Reyes");

		// Click on continue button to visit mail and password page
		cy.get('button[data-test-id="signupButtonContinue"]').click();

		// Input data mail and password
		cy.get('input[data-test-id="signupInputMail"]')
			.click()
			.type("a01284925@tec.mx");
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

		// Assert create account message
		cy.get('h2[id="swal2-title"]')
			.last()
			.should("have.text", "Cuenta creada correctamente");
		cy.get('button[class="swal2-confirm swal2-styled"]').click();

		// Assert redirect to file-explorer
		cy.url().should("eq", "http://localhost:3000/file-explorer");
	});
});
