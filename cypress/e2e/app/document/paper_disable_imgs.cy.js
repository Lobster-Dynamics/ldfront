describe("Paper disable images", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
		cy.wait(500);
		cy.visit(
			"http://localhost:3000/documento?id=36fe8a08-a30d-4f72-b215-92535da3d893",
		);
	});

	it("open file", () => {
		cy.url().should(
			"include",
			"/documento?id=36fe8a08-a30d-4f72-b215-92535da3d893",
		);
	});

	it("paper visible", () => {
		cy.get('div[data-test-id="draggableTabDocumento').click();
		cy.get('div[data-test-id="paperComponent"]').should("be.visible");
	});

    it("disable images", () => {
        cy.get('button[data-test-id="paperDisableImages"]').click();
        cy.get('img').should('not.exist');
    });
});
