describe("Graph", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
		cy.wait(500);
		cy.visit(
			"http://localhost:3000/documento?id=36fe8a08-a30d-4f72-b215-92535da3d893",
		);
		cy.get('div[data-test-id="draggableTabGrafo').click();
		cy.wait(500);
	});

	it("graph container visible", () => {
		cy.get('div[data-test-id="graphComponent"]').should("be.visible");
	});

	it("grap click on node", () => {
		// Wait for the graph to load
		cy.wait(1000);

		// Click on the center of the canvas
		cy.get('canvas[data-engine="three.js r154"]').then(($canvas) => {
			const canvasWidth = $canvas.width();
			const canvasHeight = $canvas.height();

			const canvasCenterX = canvasWidth / 2;
			const canvasCenterY = canvasHeight / 2;

			const nodeX = canvasCenterX;
			const nodeY = canvasCenterY;

			cy.wrap($canvas)
				.scrollIntoView()
				.click(nodeX, nodeY, { force: true });
		});

		cy.wait(500);

		// Check if modal title with node information is visible
		cy.get('p[data-test-id="graphKeyConceptModalTitle"]').should(
			"be.visible",
		);
	});

	it("graph click on edge", () => {
		// Wait for the graph to load
		cy.wait(1000);

		// Click on the center of the canvas
		cy.get('canvas[data-engine="three.js r154"]').then(($canvas) => {
			const canvasWidth = $canvas.width();
			const canvasHeight = $canvas.height();

			const canvasCenterX = canvasWidth / 2 - 55;
			const canvasCenterY = canvasHeight / 2 - 70;

			const nodeX = canvasCenterX;
			const nodeY = canvasCenterY;

			cy.wrap($canvas)
				.scrollIntoView()
				.click(nodeX, nodeY, { force: true });
		});

		cy.wait(500);

		// Check if modal title with node information is visible
		cy.get('div[data-test-id="graphRelationshipModalContent"]').should(
			"be.visible",
		);
	});
});
