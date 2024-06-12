describe("Profile update invalid names", () => {
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

	it("input name and lastname", () => {
		// Open navbar drop menu
		cy.get('svg[id="navbarDropdownmenuTrigger"]').click();

		// Navigate to profile page
		cy.get('div[id="navbarProfileLink"]').click();
		cy.url().should("include", "/profile");

		// Input name and lastname
		cy.get('input[data-test-id="profileUpdateInputName"]')
			.click()
			.clear()
			.type("A really long name for testing purposes");
		cy.get('input[data-test-id="profileUpdateInputLastname"]')
			.click()
			.clear()
			.type("A");
	});

	it("error message is displayed", () => {
		// Open navbar drop menu
		cy.get('svg[id="navbarDropdownmenuTrigger"]').click();

		// Navigate to profile page
		cy.get('div[id="navbarProfileLink"]').click();
		cy.url().should("include", "/profile");

		// Input name and lastname
		cy.get('input[data-test-id="profileUpdateInputName"]')
			.click()
			.clear()
			.type("A really long name for testing purposes");
		cy.get('input[data-test-id="profileUpdateInputLastname"]')
			.click()
			.clear()
			.type("A");

		// Click on update profile button
		cy.get('button[data-test-id="profileUpdateButton"]').click();

		// Assert error message
		cy.get('div[id="swal2-html-container"')
			.last()
			.should(
				"have.text",
				"El nombre y Apellido deben tener al menos 2 caracteres y menos de 15",
			);
	});
});
