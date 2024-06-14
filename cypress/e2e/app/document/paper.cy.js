describe("Paper", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
		cy.wait(500);
		cy.visit(
			"http://localhost:3000/documento?id=36fe8a08-a30d-4f72-b215-92535da3d893",
		);
	});

	it("paper container visible", () => {
		cy.get('div[data-test-id="draggableTabDocumento').click();
		cy.get('div[data-test-id="paperComponent"]').should("be.visible");
	});

	it("disable images", () => {
		cy.get('button[data-test-id="paperDisableImages"]').click();
		cy.get("img").should("not.exist");
	});

	it("explanation from paper", () => {
		cy.wait(2500);

		cy.contains(
			"The Simulation Argument posed by Bostrom suggests that we may be living inside a",
		)
			.should("exist")
			.then(($el) => {
				cy.selectText(
					$el,
					"The Simulation Argument posed by Bostrom suggests that we may be living inside a",
				);

				// Trigger a right-click event on the element
				cy.wrap($el).rightclick({ force: true });
			});

		// // Click on the get explanation button
		// cy.get("li[data-test-id='viewExplanationButton']").click();

		// // Check if the explanation is displayed
		// cy.get('p[data-test-id="explanationItemParagraph"]')
		// 	.its("length")
		// 	.should("be.gt", 0);
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
});
