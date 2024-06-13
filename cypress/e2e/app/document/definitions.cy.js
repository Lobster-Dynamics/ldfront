describe("Get Definitions", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
		cy.wait(500);
		cy.visit(
			"http://localhost:3000/documento?id=36fe8a08-a30d-4f72-b215-92535da3d893",
		);
	});

	it("english definition from paper", () => {
		cy.wait(2500);

		cy.contains("file")
			.first()
			.should("exist")
			.then(($el) => {
				cy.selectText($el, "file");

				// Trigger a right-click event on the element
				cy.wrap($el).rightclick({ force: true });
			});

		cy.get("li[data-test-id='viewDefinitionButton']").click();
		cy.get("li[data-test-id='viewDefinitionButtonEN']").click();

		// Check if the definition is displayed
		cy.get('p[data-test-id="definitionItemParagraph"]')
			.its("length")
			.should("be.gt", 0);
	});

	it("english definition from file viewer", () => {
		cy.get('div[data-test-id="draggableTabVisualizador"]').click();
		cy.wait(2500);

		cy.contains("Simulation")
			.should("exist")
			.then(($el) => {
				cy.selectText($el, "Simulation");

				// Trigger a right-click event on the element
				cy.wrap($el).rightclick();
			});

		cy.get("li[data-test-id='viewDefinitionButton']").click();
		cy.get("li[data-test-id='viewDefinitionButtonEN']").click();

		// Check if the definition is displayed
		cy.get('p[data-test-id="definitionItemParagraph"]')
			.its("length")
			.should("be.gt", 0);
	});
});
