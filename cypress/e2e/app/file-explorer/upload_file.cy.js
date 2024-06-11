describe("Create Document", () => {
    beforeEach(() => {
        cy.login("a01284650@tec.mx", "123456");
        cy.url().should("include", "/file-explorer");
    });

    it("it opens the menu to create a folder", () => {
        cy.contains("button", "Nuevo").click();
        cy.wait(1000);
        cy.get("label").contains("Archivo").should("be.visible");
    });

    it("Uploads a file", () => {
        cy.intercept("POST", "/document/upload_document").as("uploadFile");
        cy.contains("button", "Nuevo").click();
        cy.wait(500);
        cy.get("label")
            .contains("Archivo")
            .within(() => {
                cy.get('input[type="file"]').selectFile(
                    "cypress/fixtures/prueba.pdf",
                    { force: true },
                );
            });
    //Revisamos que el archivo entro al back
    cy.wait("@uploadFile").its("response.statusCode").should("eq", 200);

    //Revisamos que se haya abierto la pestaña de notficaciones
    cy.get(".absolute.bottom-0.right-0").should("be.visible");

    cy.get('[data-test-id="upload-item"]').contains("prueba.pdf").should("be.visible");

    //Revisamos que el LoadingSpinner este ahi
    cy.get('[data-test-id="upload-item"]').within(() => {
          cy.get('svg.animate-spin').should('be.visible');
    });

    cy.wait(1000)


    cy.get('[data-test-id="upload-item"]').within(() => {
        cy.get('svg.animate-spin', { timeout: 30000 }).should('not.exist'); 
        cy.get('[data-test-id="check"]').should('be.visible'); 
    });

    cy.wait(1000)

    cy.get('div[data-test-id="files-container"]').contains('p','prueba.pdf').should('be.visible');

    });

    it("Deletes file", () => {
		cy.deleteFile("prueba.pdf");
        cy.wait(1000);
        cy.get('div[data-test-id="files-container"]').contains('p', 'prueba.pdf').should('not.exist');
	});




});
