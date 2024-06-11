describe("File viewer", () => {
	beforeEach(() => {
		cy.login("a01284917@tec.mx", "123456");
		cy.wait(500);
		cy.visit(
			"http://localhost:3000/documento?id=98c4ea5c-7145-435c-ae57-a171ed98f9af",
		);
		cy.wait(200);
		cy.get('div[data-test-id="draggableTabVisualizador"]').click();
		cy.wait(2500);
	});

	it("pdf is visible", () => {
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

		cy.get("li[data-test-id='viewExplanationButton']").click();
	});
});
