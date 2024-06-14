describe("Create account", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/login");
		cy.get('a[data-test-id="signupLink"]').click();
	});

	it("navigate to create account page", () => {
		cy.url().should("include", "/create-account");
	});

	it("input name and lastname", () => {
		// Input data name and lastname
		cy.get('input[data-test-id="signupInputName"]').click().type("Rodrigo");
		cy.get('input[data-test-id="signupInputLastname"]')
			.click()
			.type("Reyes");

		// Click on continue button to visit mail and password page
		cy.get('button[data-test-id="signupButtonContinue"]').click();
	});

	it("input email and password", () => {
		// Input data name and lastname
		cy.get('input[data-test-id="signupInputName"]').click().type("Rodrigo");
		cy.get('input[data-test-id="signupInputLastname"]')
			.click()
			.type("Reyes");
	});

	it("click on continue button", () => {
		// Input data name and lastname
		cy.get('input[data-test-id="signupInputName"]').click().type("Rodrigo");
		cy.get('input[data-test-id="signupInputLastname"]')
			.click()
			.type("Reyes");

		// Click on continue button to visit mail and password page
		cy.get('button[data-test-id="signupButtonContinue"]').click();
	});

	it("input mail and password", () => {
		// Input data name and lastname
		cy.get('input[data-test-id="signupInputName"]').click().type("Rodrigo");
		cy.get('input[data-test-id="signupInputLastname"]')
			.click()
			.type("Reyes");

		// Click on continue button to visit mail and password page
		cy.get('button[data-test-id="signupButtonContinue"]').click();

		// Input data mail and password
		cy.get('input[data-test-id="signupInputMail"]')
			.click()
			.type("a01284930@tec.mx");
		cy.get('input[data-test-id="signupInputPassword"]')
			.click()
			.type("123Aa/");
		cy.get("body").click();
		cy.get('input[data-test-id="signupInputRepeatPassword"]')
			.click()
			.type("123Aa/");
	});

	it("success message is displayed & navigate to file-explorer", () => {
        // Genera tres números aleatorios
        const randomNumbers = Math.floor(1000000 + Math.random() * 9000000);

        // Construye el correo electrónico con los números aleatorios
        const randomEmail = `test${randomNumbers}@test.com`;

		// Input data name and lastname
		cy.get('input[data-test-id="signupInputName"]').click().type("Rodrigo");
		cy.get('input[data-test-id="signupInputLastname"]')
			.click()
			.type("Reyes");

		// Click on continue button to visit mail and password page
		cy.get('button[data-test-id="signupButtonContinue"]').click();

		// Input data mail and password
		cy.get('input[data-test-id="signupInputMail"]')
			.click()
			.type(randomEmail);
		cy.get('input[data-test-id="signupInputPassword"]')
			.click()
			.type("123Aa/");
		cy.get("body").click();
		cy.get('input[data-test-id="signupInputRepeatPassword"]')
			.click()
			.type("123Aa/");
		cy.get("body").click();

		// Click on continue button to create account
		cy.get('button[data-test-id="signupButtonCreate"]').click();

		// Assert create account message
		cy.get('h2[id="swal2-title"]')
			.last()
			.should("have.text", "Cuenta creada correctamente");
		cy.get('button[class="swal2-confirm swal2-styled"]').click();

		// Assert redirect to file-explorer
		cy.url().should("eq", "http://localhost:3000/file-explorer");
	});
});
