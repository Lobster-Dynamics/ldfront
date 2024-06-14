describe("Logout", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
		cy.url().should("include", "/file-explorer");
	});

	it("open navbar drop menu", () => {
		// Open navbar drop menu
		cy.get('svg[id="navbarDropdownmenuTrigger"]').click();
	});

	it("navigate to profile page", () => {
		// Open navbar drop menu
		cy.get('svg[id="navbarDropdownmenuTrigger"]').click();

		// Navigate to profile page
		cy.get('div[id="navbarProfileLink"]').click();
		cy.url().should("include", "/profile");
	});

	it("logout - navigate login page", () => {
		// Open navbar drop menu
		cy.get('svg[id="navbarDropdownmenuTrigger"]').click();

		// Navigate to profile page
		cy.get('div[id="navbarProfileLink"]').click();
		cy.url().should("include", "/profile");

		// Click on logout button
		cy.get('button[data-test-id="profileButtonLogout"]').click();

		// Check if the user is logged out
		cy.url().should("include", "/login");
	});

	it("cleared cookies", () => {
		// Open navbar drop menu
		cy.get('svg[id="navbarDropdownmenuTrigger"]').click();

		// Navigate to profile page
		cy.get('div[id="navbarProfileLink"]').click();
		cy.url().should("include", "/profile");

		// Click on logout button
		cy.get('button[data-test-id="profileButtonLogout"]').click();

		// Check if the user is logged out
		cy.url().should("include", "/login");

		// Check if the cookies are cleared
		cy.getCookies().should("be.empty");
	});
});
