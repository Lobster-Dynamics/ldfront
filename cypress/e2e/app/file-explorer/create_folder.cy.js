describe("Create Folder", () => {

    beforeEach(() => {
        cy.login('a01284650@tec.mx','123456');
        cy.url().should('include', '/file-explorer');
    });

    it("it opens the menu to create a folder", () => {
        cy.contains('button', 'Nuevo').click();
        cy.wait(1000); 
        cy.get('button[data-test-id="createFolder"]').should('be.visible');
    });

    it('allows enter a folder name in the modal',  () => {
        cy.contains('button', 'Nuevo').click();
        cy.wait(500); 
        cy.get('button[data-test-id="createFolder"]').click();
        cy.get('input[id="swal2-input"]').type('Lobster Folder'); 
        cy.get('input[id="swal2-input"]').should('have.value', 'Lobster Folder');
    })

    it('Creates a new folder',  () => {
        cy.intercept('POST', '/directory/create_directory').as('createFolder');
        cy.contains('button', 'Nuevo').click();
        cy.wait(500); 
        cy.get('button[data-test-id="createFolder"]').click();
        cy.get('input[id="swal2-input"]').should('be.visible').type('Lobster Foldedwr{enter}'); 
        cy.wait('@createFolder').its('response.statusCode').should('eq', 200);
        cy.get('h2[class="swal2-title"]').last().should('have.text','Carpeta creada correctamente!!');
        cy.contains('button', 'OK').click();

        //Revisar que el Folder existe

        cy.wait(1000)
        cy.get('div[data-test-id="files-container"]').contains('p','Lobster Foldedwr').should('be.visible');
    })

    it('Cancels a create folder',  () => {
        cy.contains('button', 'Nuevo').click();
        cy.wait(500); 
        cy.get('button[data-test-id="createFolder"]').click();
        cy.contains('button', 'Cancelar').click();
    })

})

