describe("Profile information", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
	});

	it("open profile", () => {
		// Open navbar drop menu
		cy.get('svg[id="navbarDropdownmenuTrigger"]').click();

		// Navigate to profile page
		cy.get('div[id="navbarProfileLink"]').click();
		cy.url().should("include", "/profile");
	});

	it("validate profile information", () => {
		// Open navbar drop menu
		cy.get('svg[id="navbarDropdownmenuTrigger"]').click();

		// Navigate to profile page
		cy.get('div[id="navbarProfileLink"]').click();
		cy.url().should("include", "/profile");

		// Validate profile information
		cy.get('input[data-test-id="profileUpdateInputName"]').should(
			"have.value",
			"Testname",
		);
		cy.get('input[data-test-id="profileUpdateInputLastname"]').should(
			"have.value",
			"Testlastname",
		);
	});
});
