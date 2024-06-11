describe("Paper disable images", () => {
	beforeEach(() => {
		cy.login("a01284917@tec.mx", "123456");
		cy.wait(500);
		cy.visit(
			"http://localhost:3000/documento?id=98c4ea5c-7145-435c-ae57-a171ed98f9af",
		);
	});

	it("open file", () => {
		cy.url().should(
			"include",
			"/documento?id=98c4ea5c-7145-435c-ae57-a171ed98f9af",
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
