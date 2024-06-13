describe("Get Explanation", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
		cy.wait(500);
		cy.visit(
			"http://localhost:3000/documento?id=36fe8a08-a30d-4f72-b215-92535da3d893",
		);
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

	it("explanation from file viewer", () => {
		cy.get('div[data-test-id="draggableTabVisualizador"]').click();
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
				cy.wrap($el).rightclick();
			});

		// Click on the get explanation button
		cy.get("li[data-test-id='viewExplanationButton']").click();

		// Check if the explanation is displayed
		cy.get('p[data-test-id="explanationItemParagraph"]')
			.its("length")
			.should("be.gt", 0);
	});
});
