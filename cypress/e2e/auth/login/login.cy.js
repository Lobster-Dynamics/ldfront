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
			.type("cocoloco");
	});

	it("click on login button", () => {
		// Input mail and password
		cy.get('input[data-test-id="usernameInputLogin"]')
			.click()
			.type("adrian.hernandez.p0@gmail.com");
		cy.get('input[data-test-id="passwordInputLogin"]')
			.click()
			.type("cocoloco");

		// Click on login button
		cy.get('button[data-test-id="loginButton"]').click();
	});

	it("should navigate to file explorer page", () => {
		// Input mail and password
		cy.get('input[data-test-id="usernameInputLogin"]')
			.click()
			.type("adrian.hernandez.p0@gmail.com");
		cy.get('input[data-test-id="passwordInputLogin"]')
			.click()
			.type("cocoloco");

		// Click on login button
		cy.get('button[data-test-id="loginButton"]').click();

		// Check if the url is correct (file-explorer page)
		cy.url().should("include", "/file-explorer");
	});
});
