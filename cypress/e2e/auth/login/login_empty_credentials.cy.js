describe("Login", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/file-explorer");
	});

	it("should navigate to login page", () => {
		cy.url().should("include", "/login");
	});

	it("click on login button", () => {
		// Click on login button
		cy.get('button[data-test-id="loginButton"]').click();
	});

	it("error message is displayed ", () => {
		// Click on login button
		cy.get('button[data-test-id="loginButton"]').click();

		// Assert error message
        cy.get('div[id="swal2-html-container"]')
			.last()
			.should("have.text", "Contraseña o usuario incorrectos");
	});
});
