describe("Forgot password invalid mail", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/login");
		cy.get('button[data-test-id="forgotPasswordLink"]').click();
	});

	it("navigate to forgot password page", () => {
		cy.visit("http://localhost:3000/login");
		cy.get('button[data-test-id="forgotPasswordLink"]').click();
		cy.url().should("include", "/forgot");
	});

	it("input invalid mail", () => {
		cy.get('input[data-test-id="forgotPasswordInputMail"]')
			.click()
			.type("hola@123");
	});

	it("click on send button", () => {
		cy.get('input[data-test-id="forgotPasswordInputMail"]')
			.click()
			.type("hola@123");
		cy.get('button[data-test-id="forgotPasswordButtonSend"]').click();
	});

	it("error message is displayed", () => {
		cy.get('input[data-test-id="forgotPasswordInputMail"]')
			.click()
			.type("hola@123");
		cy.get('button[data-test-id="forgotPasswordButtonSend"]').click();
		cy.get('div[id="swal2-html-container"]')
			.last()
			.should("have.text", "Tienes que escribir un correo válido");
	});
});
