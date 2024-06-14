describe("File viewer", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
		cy.wait(500);
		cy.visit(
			"http://localhost:3000/documento?id=36fe8a08-a30d-4f72-b215-92535da3d893",
		);
		cy.wait(200);
		cy.get('div[data-test-id="draggableTabVisualizador"]').click();
		cy.wait(2500);
	});

	it("pdf (file viewer) container is visible", () => {
		cy.get(".react-pdf__message.react-pdf__message--error").should(
			"not.exist",
		);
	});

	it("change page", () => {
		cy.get('button[data-test-id="fileViewerNextPage"]').click();
		cy.wait(100);
		cy.get('button[data-test-id="fileViewerPreviousPage"]').click();
	});

	it("zoom in & out", () => {
		cy.get('button[data-test-id="fileViewerZoomIn"]').click();
		cy.wait(100);
		cy.get('button[data-test-id="fileViewerZoomOut"]').click();
	});

	it("copy text", () => {
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

		cy.get("li[data-test-id='copyToClipboardButton']").click();
	});

	it("get explanation", () => {
		cy.get('div[data-test-id="draggableTabVisualizador"]').click();
		cy.wait(3000);

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

	it("get english definition", () => {
		cy.get('div[data-test-id="draggableTabVisualizador"]').click();
		cy.wait(3000);

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
