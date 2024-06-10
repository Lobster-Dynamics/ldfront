describe("Create account", () => {
	it("should display error message when invalid password", () => {
        // Visit create account page
        cy.visit("http://localhost:3000/create-account", {
            failOnStatusCode: false,
        });
        
		// Input name and lastname
		cy.get('input[data-test-id="signupInputName"]').click().type("Rodrigo");
		cy.get('input[data-test-id="signupInputLastname"]')
			.click()
			.type("Reyes");

        // Click on continue button
        cy.get('button[data-test-id="signupButtonContinue"]').click();

        // Input data mail and password
        cy.get('input[data-test-id="signupInputMail"]')
            .click()
            .type("a01284917@tec.mx");
        cy.get('input[data-test-id="signupInputPassword"]')
            .click()
            .type("123/");
        cy.get("body").click();
        cy.get('input[data-test-id="signupInputRepeatPassword"]')
            .click()
            .type("123A");
        cy.get("body").click();

        // Click on create account button
        cy.get('button[data-test-id="signupButtonCreate"]').click();

        // Assert error message
        cy.get('div[id="swal2-html-container"')
            .last()
            .should(
                "have.text",
                "La contraseña no cumple con el formato requerido",
            );
	});
});
