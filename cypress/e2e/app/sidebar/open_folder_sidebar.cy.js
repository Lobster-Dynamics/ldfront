describe("Open a file from the sidebar", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
		cy.wait(500);
		cy.visit(
			"http://localhost:3000/file-explorer",
		);
	});
    it("Sidebar folder visible and opens", () => {
        cy.wait(500);
		cy.get('div[data-test-id="sidebarFolder-sidebar test folder"]').should("be.visible").click();
	});
});