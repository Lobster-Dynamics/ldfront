describe("Key Words", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
		cy.wait(500);
		cy.visit(
			"http://localhost:3000/documento?id=36fe8a08-a30d-4f72-b215-92535da3d893",
		);
	});

	it("keywords container visible", () => {
		cy.get('div[data-test-id="draggableTabConceptos').click();
		cy.get('div[data-test-id="keywordsComponent"]').should("be.visible");
	});
});
