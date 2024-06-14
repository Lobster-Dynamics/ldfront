describe("Navigate Home", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
		cy.url().should("include", "/file-explorer");
	});

	it("navigate to home", () => {
		// Navigate to home
		cy.get('a[data-test-id="navbarHomeLink"]').click();

		// Check if the user is in the home page
		cy.url().should("include", "/file-explorer");
	});
});
