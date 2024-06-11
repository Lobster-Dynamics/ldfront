describe("Delete File", () => {
	beforeEach(() => {
		cy.login("a01284650@tec.mx", "123456");
		cy.url().should("include", "/file-explorer");
	});

	it("Creates a new file", () => {
		cy.uploadFile("cypress/fixtures/prueba.pdf");
	});

	it("Opens the SubMenu", () => {
		cy.openSubMenuFile("prueba.pdf");
	});

	it("Cancels a delete file", () => {
		cy.openSubMenuFile("prueba.pdf");
		cy.get('button[data-test-id="delete"]').should("be.visible").click();
		cy.contains("button", "Cancelar").click();
	});

	it("Deletes a file", () => {
		cy.deleteFile("prueba.pdf");
        cy.wait(1000);
        cy.get('div[data-test-id="files-container"]').contains('p', 'prueba.pdf').should('not.exist');
	});
});
