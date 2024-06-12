describe("Share Folder", () => {

    beforeEach(() => {
        cy.login("test1@test.com", "123Aa/");
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

    it("Cancels a share folder", () => {
        cy.openSubMenu("prueba1");
        cy.get('button[data-test-id="share"]').should("be.visible").click();
        cy.contains("button", "Cancelar").click();
    });

    it("Shares a folder", () => {
        const folderName = "prueba1";
        cy.openSubMenu(folderName);
        cy.intercept('PUT', '/directory/share_directory').as('shareFolder');

        cy.contains('button', 'Compartir').click();
        cy.get('input[id="swal2-input"]').should('be.visible').type('test2@test.com{enter}');

        cy.wait('@shareFolder').its('response.statusCode').should('eq', 200);
        cy.contains('button', 'OK').click();
    });

    it("Borramos el Folder", () => {
        //Borramos el Folder
        const folderName = "prueba1";
        cy.deleteFolder(folderName);
    });



})
