describe("Explanations", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
		cy.wait(500);
		cy.visit(
			"http://localhost:3000/documento?id=36fe8a08-a30d-4f72-b215-92535da3d893",
		);
		cy.wait(500);
		cy.get('div[data-test-id="dragContainerleft"]').scrollTo("right");
		cy.get('div[data-test-id="draggableTabExplanation').click();
	});

	it("explanations container visible", () => {
		cy.get('div[data-test-id="explanationComponent"]').should("be.visible");
	});

	it("tooltip with explanations topic is visible", () => {
		// Tooltip with explanations topic is visible
		cy.get('ul[data-test-id="explanationTooltip"]').should("be.visible");

		// Tooltip has explanation topics
		cy.get('li[data-test-id="explanationToolTipTrigger"]')
			.its("length")
			.should("be.gt", 0);
	});

	it("first explanation text is visible", () => {
		// Tooltip has explanation topics
		cy.get('li[data-test-id="explanationToolTipTrigger"]')
			.its("length")
			.should("be.gt", 0);

		// Click on the first explanation topic
		cy.get('li[data-test-id="explanationToolTipTrigger"]').first().click();

		// Explanation title is visible
		cy.get('h2[data-test-id="explanationContentTitle"]').should(
			"be.visible",
		);

		// Explanation text is visible
		cy.get('p[data-test-id="explanationContentText"]').should("be.visible");
	});

	it("change explanation topic", () => {
		// Click on the first explanation topic
		cy.get('li[data-test-id="explanationToolTipTrigger"]').last().click();

		// Explanation title is visible
		cy.get('h2[data-test-id="explanationContentTitle"]').should(
			"be.visible",
		);

		// Explanation text is visible
		cy.get('p[data-test-id="explanationContentText"]').should("be.visible");
	});
});
