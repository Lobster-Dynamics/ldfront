describe("Forgot password invalid mail", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/forgot", {
            failOnStatusCode: false,
        });
	});

	it("navigate to forgot password page", () => {
		cy.visit("http://localhost:3000/login", {
			failOnStatusCode: false,
		});
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

	it("assert error message", () => {
		cy.get('input[data-test-id="forgotPasswordInputMail"]')
			.click()
			.type("hola@123");
		cy.get('button[data-test-id="forgotPasswordButtonSend"]').click();
		cy.get('div[id="swal2-html-container"]')
			.last()
			.should("have.text", "Tienes que escribir un correo válido");
	});
});
