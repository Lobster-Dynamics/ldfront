describe("Tab features", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
		cy.wait(500);
		cy.visit(
			"http://localhost:3000/documento?id=36fe8a08-a30d-4f72-b215-92535da3d893",
		);
	});

	it("select tab", () => {
		cy.get('div[data-test-id="draggableTabResumen').click();
		cy.get('div[data-test-id="summaryComponent"]').should("be.visible");
	});
});
