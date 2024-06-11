describe("Select Tab", () => {
	beforeEach(() => {
		cy.login("a01284917@tec.mx", "123456");
		cy.wait(500);
		cy.visit(
			"http://localhost:3000/documento?id=98c4ea5c-7145-435c-ae57-a171ed98f9af",
		);
	});

	it("select tab", () => {
		cy.get('div[data-test-id="draggableTabResumen').click();
		cy.get('div[data-test-id="summaryComponent"]').should("be.visible");
	});
});
