describe("Forgot password invalid mail", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/login");
		cy.get('button[data-test-id="forgotPasswordLink"]').click();
	});

	it("navigate to forgot password page", () => {
		cy.visit("http://localhost:3000/login");
		cy.get('button[data-test-id="forgotPasswordLink"]').click();
		cy.url().should("include", "/forgot");
	});

	it("navigate to login page", () => {
		cy.get('a[data-test-id="loginLink"]').click();
        cy.url().should("include", "/login");
	});
});
