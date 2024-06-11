describe("Rename Folder", () => {

    beforeEach(() => {
        cy.login('a01284650@tec.mx','123456');
        cy.url().should('include', '/file-explorer');
    });

    it("Creates a new folder", () => {
        const folderName = "prueba1";
        cy.createFolder(folderName);
    });

    it("Opens the SubMenu", () => {
        const folderName = "prueba1";

        cy.openSubMenu(folderName);
    });

    it("Cancels a rename folder", () => {
        cy.openSubMenu("prueba1");
        cy.get('button[data-test-id="rename"]').should("be.visible").click();
        cy.contains("button", "Cancelar").click();
    });

    it("Renames a folder", () => {
        const folderName = "prueba1";
        cy.openSubMenu(folderName);
        cy.intercept('GET', '/document/rename_document/**').as('renameFolder');
        cy.get('button[data-test-id="rename"]').should("be.visible").click();
        cy.get('input[id="swal2-input"]').should('be.visible').type('prueba2{enter}'); 
        cy.wait('@renameFolder').its('response.statusCode').should('eq', 200);
        cy.contains('button', 'OK').click();

    });

    it("Borramos el Folder", () => {
        //Borramos el Folder
        const folderName2 = "prueba2";
        cy.deleteFolder(folderName2);
    });

})
