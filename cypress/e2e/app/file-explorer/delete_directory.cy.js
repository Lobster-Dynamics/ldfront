describe("Delete Folder", () => {
    beforeEach(() => {
        cy.login("test1@test.com", "123Aa/");
        cy.url().should("include", "/file-explorer");
    });

    it("Creates a new folder", () => {
        const folderName = "prueba1";
        cy.createFolder(folderName);
    });

    it("Opens the SubMenu", () => {
        const folderName = "prueba1";

        cy.openSubMenu(folderName);
    });

    it("Cancels a delete folder", () => {
        cy.openSubMenu("prueba1");
        cy.get('button[data-test-id="delete"]').should("be.visible").click();
        cy.contains("button", "Cancelar").click();
    });

    it("Deletes a folder", () => {
        const folderName = "prueba1";
        cy.deleteFolder(folderName);
        cy.wait(1000)
        cy.get('div[data-test-id="files-container"]').contains('p', folderName).should('not.exist');
    });
});
