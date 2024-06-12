describe("Search", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
	});

	it("input for search", () => {
		// Search for a file
		cy.get('input[data-test-id="searchBarInput"]').type(
			"tst foldr fr search{enter}",
		);
	});

	it("display search results", () => {
		// Create a folder
		cy.createFolder("Test Folder for Search 1");
		cy.createFolder("Test Folder for Search 2");

		// Search for a file
		cy.get('input[data-test-id="searchBarInput"]').type(
			"tst foldr fr search{enter}",
		);

		// Check if the search results are displayed
		cy.get('div[data-test-id="searchBarItem"').should("have.length", 2);

        // Delete created folders
        cy.deleteFolder("Test Folder for Search 1");
        cy.deleteFolder("Test Folder for Search 2");
	});
});
