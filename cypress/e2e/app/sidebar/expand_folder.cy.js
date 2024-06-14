describe("Open a file from the sidebar", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
		cy.wait(500);
		cy.visit(
			"http://localhost:3000/file-explorer",
		);
	});
    it("Sidebar folder visible and expands", () => {
        cy.wait(1500);
        cy.get('div[data-test-id="sidebarFolder-sidebar test folder"]').find('button').first().should('be.visible').click();
        cy.get('div[data-test-id="sidebarFile-sidebar test file dont delete"]').should("be.visible").click();
	});
});