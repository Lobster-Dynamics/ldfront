describe("Document View", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
		cy.wait(500);
		cy.visit(
			"http://localhost:3000/documento?id=36fe8a08-a30d-4f72-b215-92535da3d893",
		);
        cy.wait(500);
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

	it("graph visible", () => {
		cy.get('div[data-test-id="draggableTabGrafo').click();
		cy.get('div[data-test-id="graphComponent"]').should("be.visible");
	});

	it("summary visible", () => {
		cy.get('div[data-test-id="draggableTabResumen').click();
		cy.get('div[data-test-id="summaryComponent"]').should("be.visible");
	});

	it("word cloud visible", () => {
		cy.get('div[data-test-id="draggableTabNube de Palabras').click();
		cy.get('div[data-test-id="wordcloudComponent"]').should("be.visible");
	});

	it("keywords visible", () => {
		cy.get('div[data-test-id="draggableTabConceptos').click();
		cy.get('div[data-test-id="keywordsComponent"]').should("be.visible");
	});

	it("chat visible", () => {
		cy.get('div[data-test-id="draggableTabChat').click();
		cy.get('div[data-test-id="chatComponent"]').should("be.visible");
	});

	it("explanations visible", () => {
		cy.get('div[data-test-id="dragContainerleft"]').scrollTo("right");
		cy.get('div[data-test-id="draggableTabExplanation').click();
		cy.get('div[data-test-id="explanationComponent"]').should("be.visible");
	});

	it("file viewer visible", () => {
		cy.get('div[data-test-id="draggableTabVisualizador').click();
		cy.get('div[data-test-id="fileviewerComponent"]').should("be.visible");
	});
});
