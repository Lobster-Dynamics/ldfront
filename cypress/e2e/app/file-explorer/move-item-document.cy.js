describe("Drag and Drop Folder on File", () => {
    beforeEach(() => {
        cy.login("test1@test.com", "123Aa/");
        cy.url().should("include", "/file-explorer");
    });

    it("Creates a new items", () => {
		cy.uploadFile("cypress/fixtures/prueba.pdf");
        const folderNameDrop = "drop";
        cy.createFolder(folderNameDrop);
        cy.wait(1000);

	});

       it("It drags and drop a file", () => {
        const itemName = "prueba.pdf";
        const targetFolderName = "drop"; 

        // Se agarra el documento 
        cy.get('div[data-test-id="file"]')
            .contains("p", itemName)
            .then(($file) => {
                cy.wrap($file)
                    .parents('div[data-test-id="file"]')
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

       //Revisamos que el archivo existe dentro de la carpeta

        cy.get('div[data-test-id="file"]')
            .contains("p",itemName)
            .should("be.visible");

    });

    it("Borramos el Folder", () => {
        //Borramos el Folder
        const folderName = "drop";
        cy.deleteFolder(folderName);
    });

});

