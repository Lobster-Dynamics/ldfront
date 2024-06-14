describe("Tab features", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
		cy.wait(500);
		cy.visit(
			"http://localhost:3000/documento?id=36fe8a08-a30d-4f72-b215-92535da3d893",
		);
	});

	it("select tab", () => {
		cy.get('div[data-test-id="draggableTabResumen').click();
		cy.get('div[data-test-id="summaryComponent"]').should("be.visible");
	});

	it("drag tab in left container to right top container", () => {
		// Initate drag event
		cy.get('div[data-test-id="draggableTabGrafo"]').then(($tab) => {
			cy.wrap($tab).trigger("dragstart", {
				dataTransfer: new DataTransfer(),
			});
		});

		// Drop event
		cy.get('div[data-test-id="dragContainerrightTop"]').then(
			($targetDropContainer) => {
				cy.wrap($targetDropContainer).trigger("drop", {
					dataTransfer: new DataTransfer(),
				});
			},
		);

		cy.get('div[data-test-id="dragContainerrightTop"]')
			.find('div[data-test-id="draggableTabGrafo"]')
			.should("exist");
	});

	it("container autoclose when empty", () => {
		// Drag right top tabs to right bottom container
		cy.get('div[data-test-id="draggableTabChat"]').then(($tab) => {
			cy.wrap($tab).trigger("dragstart", {
				dataTransfer: new DataTransfer(),
			});
		});

		// Drop event
		cy.get('div[data-test-id="dragContainerrightBottom"]').then(
			($targetDropContainer) => {
				cy.wrap($targetDropContainer).trigger("drop", {
					dataTransfer: new DataTransfer(),
				});
			},
		);

		// Drag right top tabs to right bottom container
		cy.get('div[data-test-id="draggableTabResumen"]').then(($tab) => {
			cy.wrap($tab).trigger("dragstart", {
				dataTransfer: new DataTransfer(),
			});
		});

		// Drop event
		cy.get('div[data-test-id="dragContainerrightBottom"]').then(
			($targetDropContainer) => {
				cy.wrap($targetDropContainer).trigger("drop", {
					dataTransfer: new DataTransfer(),
				});
			},
		);

		cy.wait(500);
		cy.get('div[data-test-id="containerrightTop"]').should("not.exist");
	});

	it("container hides when size is small (from vertical resize)", () => {
		cy.get('[data-test-id="verticalResizeHandle"]') // Ajusta el selector al controlador de redimensionamiento
			.trigger("mousedown", { which: 1 });

		// Move mouse to the left
		cy.document().trigger("mousemove", {
			clientX: -500,
			clientY: 0,
		});

		// End drag
		cy.document().trigger("mouseup");

		cy.wait(500);
		cy.get('div[data-test-id="containerleft"]').should("not.exist");
	});

	it("container hides when size is small (from horizontal resize)", () => {
		cy.get('[data-test-id="horizontalResizeHandle"]').trigger("mousedown", {
			which: 1,
		});

		// Move mouse to the top
		cy.document().trigger("mousemove", {
			clientX: 0,
			clientY: -500,
		});

		// End drag
		cy.document().trigger("mouseup");

		cy.wait(500);
		cy.get('div[data-test-id="containerrightTop"]').should("not.exist");
	});
});
