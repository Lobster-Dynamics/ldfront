// cypress/integration/drag_and_drop_spec.js
describe("Drag and Drop Folder on Folder", () => {
    beforeEach(() => {
        cy.login("test1@test.com", "123Aa/");
        cy.url().should("include", "/file-explorer");
    });

    it("Creates two new folders", () => {
        const folderName = "drag";
        cy.createFolder(folderName);
        const folderNameDrop = "drop";
        cy.createFolder(folderNameDrop);
        cy.wait(1000);
    });

    it("should drag and drop a folder", () => {
        const folderName = "drag";
        const targetFolderName = "drop"; 

        // Se agarra el folder
        cy.get('div[data-test-id="folder"]')
            .contains("p", folderName)
            .then(($folder) => {
                cy.wrap($folder)
                    .parents('div[data-test-id="folder"]')
                    .trigger("dragstart", { dataTransfer: new DataTransfer() });
            });

        // Se deja en el segundo folder
        cy.get('div[data-test-id="folder"]')
            .contains("p", targetFolderName)
            .then(($targetFolder) => {
                cy.wrap($targetFolder)
                    .parents('div[data-test-id="folder"]')
                    .trigger("drop", { dataTransfer: new DataTransfer() });
            });


        cy.wait(5000);

        // Entramos al folder
        
        cy.get('div[data-test-id="folder"]')
            .contains("p", targetFolderName)
            .then(($targetFolder) => {
               	cy.wrap($targetFolder)
					.parents('div[data-test-id="folder"]')
					.find('button[data-test-id="folder-context-menu-botton"]')
					.click();
                     cy.get('button[data-test-id="open"]').should("be.visible").click();

            });

        cy.wait(1000);


       //Revisamos que el folder existe dentro de la carpeta

        cy.get('div[data-test-id="folder"]')
            .contains("p",folderName)
            .should("be.visible");

    });

    it("Borramos el Folder", () => {
        //Borramos el Folder
        const folderName = "drop";
        cy.deleteFolder(folderName);
    });

});
