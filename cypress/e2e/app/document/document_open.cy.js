describe("Document View", () => {
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
