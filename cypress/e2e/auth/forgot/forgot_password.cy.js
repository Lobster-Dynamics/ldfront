describe("Forgot password valid mail", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/login");
		cy.get('button[data-test-id="forgotPasswordLink"]').click();
	});

	it("navigate to forgot password page", () => {
		cy.visit("http://localhost:3000/login");
		cy.get('button[data-test-id="forgotPasswordLink"]').click();
		cy.url().should("include", "/forgot");
	});

	it("input valid mail", () => {
		cy.get('input[data-test-id="forgotPasswordInputMail"]')
			.click()
			.type("test1@test.com");
	});

	it("click on send button", () => {
		cy.get('input[data-test-id="forgotPasswordInputMail"]')
			.click()
			.type("test1@test.com");
		cy.get('button[data-test-id="forgotPasswordButtonSend"]').click();
	});

	it("success message is displayed", () => {
		cy.get('input[data-test-id="forgotPasswordInputMail"]')
			.click()
			.type("test1@test.com");
		cy.get('button[data-test-id="forgotPasswordButtonSend"]').click();
		cy.get('h2[id="swal2-title"]')
			.last()
			.should("have.text", "Se envió el correo correctamente");
	});
});
