describe("Rename File", () => {
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

	it("Cancels a rename file", () => {
		cy.openSubMenuFile("prueba.pdf");
		cy.get('button[data-test-id="rename"]').should("be.visible").click();
		cy.contains("button", "Cancelar").click();
	});

	it("Renames a file", () => {
		cy.openSubMenuFile("prueba.pdf");
		cy.intercept("GET", "/document/rename_document/**").as("renameFile");
		cy.get('button[data-test-id="rename"]').should("be.visible").click();
		cy.get('input[id="swal2-input"]')
			.should("be.visible")
			.type("prueba2.pdf{enter}");
		cy.wait("@renameFile").its("response.statusCode").should("eq", 200);
		cy.contains("button", "OK").click();
	});

	it("Deletes file", () => {
		cy.deleteFile("prueba2.pdf");
		cy.wait(1000);
		cy.get('div[data-test-id="files-container"]')
			.contains("p", "prueba.pdf")
			.should("not.exist");
	});
});
