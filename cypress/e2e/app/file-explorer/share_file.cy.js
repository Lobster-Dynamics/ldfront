describe("Share File", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
		cy.url().should("include", "/file-explorer");
	});

	it("Creates a new items", () => {
		cy.uploadFile("cypress/fixtures/prueba.pdf");
		cy.wait(1000);
	});

	it("Opens the SubMenu", () => {
		const fileName = "prueba.pdf";

		cy.openSubMenuFile(fileName);
	});

	it("Cancels a share file", () => {
		cy.openSubMenuFile("prueba.pdf");
		cy.get('button[data-test-id="share"]').should("be.visible").click();
		cy.contains("button", "Cancelar").click();
	});

	it("Shares a file", () => {
		const fileName = "prueba.pdf";
		cy.openSubMenuFile(fileName);
		cy.intercept("PUT", "/document/share_document").as("shareFile");

		cy.contains("button", "Compartir").click();
		cy.get('input[id="swal2-input"]')
			.should("be.visible")
			.type("test2@test.com{enter}");

		cy.wait("@shareFile").its("response.statusCode").should("eq", 200);
		cy.contains("button", "OK").click();
	});

	it("Delete the file", () => {
		//Borramos el Folder
		const fileName = "prueba.pdf";
		cy.deleteFile(fileName);
	});
});
