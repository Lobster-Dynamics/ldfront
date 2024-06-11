describe("Navigate Home", () => {
	beforeEach(() => {
		cy.login("a01284917@tec.mx", "123456");
		cy.url().should("include", "/file-explorer");
	});

	it("navigate to home", () => {
		// Navigate to home
		cy.get('a[data-test-id="navbarHomeLink"]').click();

		// Check if the user is in the home page
		cy.url().should("include", "/file-explorer");
	});
});
