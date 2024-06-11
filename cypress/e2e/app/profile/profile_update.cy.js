describe("Profile update", () => {
	beforeEach(() => {
		cy.login("a01284650@tec.mx", "123456");
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
			.type("Testname");
		cy.get('input[data-test-id="profileUpdateInputLastname"]')
			.click()
			.clear()
			.type("Testlastname");
	});

	it("update profile", () => {
		// Open navbar drop menu
		cy.get('svg[id="navbarDropdownmenuTrigger"]').click();

		// Navigate to profile page
		cy.get('div[id="navbarProfileLink"]').click();
		cy.url().should("include", "/profile");

		// Input name and lastname
		cy.get('input[data-test-id="profileUpdateInputName"]')
			.click()
			.clear()
			.type("Testname");
		cy.get('input[data-test-id="profileUpdateInputLastname"]')
			.click()
			.clear()
			.type("Testlastname");

		// Update profile
		cy.intercept("POST", "/user/update_profile").as("updateProfile");
		cy.get('button[data-test-id="profileUpdateButton"]').click();
		cy.wait("@updateProfile").its("response.statusCode").should("eq", 200);
	});

	it("success message is displayed", () => {
		// Open navbar drop menu
		cy.get('svg[id="navbarDropdownmenuTrigger"]').click();

		// Navigate to profile page
		cy.get('div[id="navbarProfileLink"]').click();
		cy.url().should("include", "/profile");

		// Input name and lastname
		cy.get('input[data-test-id="profileUpdateInputName"]')
			.click()
			.clear()
			.type("Testname");
		cy.get('input[data-test-id="profileUpdateInputLastname"]')
			.click()
			.clear()
			.type("Testlastname");

		// Update profile
		cy.intercept("POST", "/user/update_profile").as("updateProfile");
		cy.get('button[data-test-id="profileUpdateButton"]').click();
		cy.wait("@updateProfile").its("response.statusCode").should("eq", 200);

		// Assert create account message
		cy.get('h2[id="swal2-title"]')
			.last()
			.should("have.text", "Usuario actualizado correctamente");
	});
});
