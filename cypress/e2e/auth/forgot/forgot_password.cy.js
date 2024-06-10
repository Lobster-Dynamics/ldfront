describe("Forgot password valid mail", () => {
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

	it("input valid mail", () => {
		cy.get('input[data-test-id="forgotPasswordInputMail"]')
			.click()
			.type("a01284917@tec.mx");
	});

	it("click on send button", () => {
		cy.get('input[data-test-id="forgotPasswordInputMail"]')
			.click()
			.type("a01284917@tec.mx");
		cy.get('button[data-test-id="forgotPasswordButtonSend"]').click();
	});

	it("assert success message", () => {
		cy.get('input[data-test-id="forgotPasswordInputMail"]')
			.click()
			.type("a01284917@tec.mx");
		cy.get('button[data-test-id="forgotPasswordButtonSend"]').click();
		cy.get('h2[id="swal2-title"]')
			.last()
			.should("have.text", "Se envió el correo correctamente");
	});
});
