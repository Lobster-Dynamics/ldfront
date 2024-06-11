describe("Login", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/file-explorer");
	});

	it("should navigate to login page", () => {
		cy.url().should("include", "/login");
	});

	it("input mail and password", () => {
		// Input mail and password
		cy.get('input[data-test-id="usernameInputLogin"]')
			.click()
			.type("adrian.hernandez.p0@gmail.com");
		cy.get('input[data-test-id="passwordInputLogin"]')
			.click()
			.type("cocolocos");
	});

	it("click on login button", () => {
		// Input mail and password
		cy.get('input[data-test-id="usernameInputLogin"]')
			.click()
			.type("adrian.hernandez.p0@gmail.com");
		cy.get('input[data-test-id="passwordInputLogin"]')
			.click()
			.type("cocolocos");

		// Click on login button
		cy.get('button[data-test-id="loginButton"]').click();
	});

	it("error message is displayed ", () => {
		// Input mail and password
		cy.get('input[data-test-id="usernameInputLogin"]')
			.click()
			.type("adrian.hernandez.p0@gmail.com");
		cy.get('input[data-test-id="passwordInputLogin"]')
			.click()
			.type("cocolocos");

		// Click on login button
		cy.get('button[data-test-id="loginButton"]').click();

		// Assert error message
        cy.get('div[id="swal2-html-container"]')
			.last()
			.should("have.text", "Contraseña o usuario incorrectos");
	});
});
