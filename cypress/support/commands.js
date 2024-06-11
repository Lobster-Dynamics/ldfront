/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
//
//
Cypress.Commands.add('login',(email, password) => {
  cy.visit('http://localhost:3000/file-explorer', { failOnStatusCode: false });
  cy.get('input[data-test-id="usernameInputLogin"]').click().type(email);
  cy.get('input[data-test-id="passwordInputLogin"]').click().type(password);
  cy.get('button[data-test-id="loginButton"]').click();
});

Cypress.Commands.add('createFolder', (folderName) => {
  cy.intercept('POST', '/directory/create_directory').as('createFolder');
  cy.contains('button', 'Nuevo').click();
  cy.wait(500); 
  cy.get('button[data-test-id="createFolder"]').click();
  cy.get('input[id="swal2-input"]').should('be.visible').type(`${folderName}{enter}`); 
  cy.wait('@createFolder').its('response.statusCode').should('eq', 200);
  cy.get('h2[class="swal2-title"]').last().should('have.text','Carpeta creada correctamente!!');
  cy.contains('button', 'OK').click();

  // Verify that the folder exists
  cy.wait(1000);
  cy.get('div[data-test-id="files-container"]').contains('p', folderName).should('be.visible');
});

