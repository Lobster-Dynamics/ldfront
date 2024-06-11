describe("Logout", () => {
	beforeEach(() => {
		cy.login("a01284650@tec.mx", "123456");
		cy.url().should("include", "/file-explorer");
	});

	it("open navbar drop menu", () => {
		// Open navbar drop menu
		cy.get('svg[id="navbarDropdownmenuTrigger"]').click();
	});

	it("logout - navigate login page", () => {
		// Open navbar drop menu
		cy.get('svg[id="navbarDropdownmenuTrigger"]').click();

		// Logout
		cy.get('div[id="navbarLogoutButton"]').click();

		// Check if the user is logged out
		cy.url().should("include", "/login");
	});

	it("cleared cookies", () => {
		// Open navbar drop menu
		cy.get('svg[id="navbarDropdownmenuTrigger"]').click();

		// Logout
		cy.get('div[id="navbarLogoutButton"]').click();

		// Check if the user is logged out
		cy.url().should("include", "/login");

		// Check if the cookies are cleared
		cy.getCookies().should("be.empty");
	});
});
