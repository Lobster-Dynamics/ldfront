describe("Search", () => {
	beforeEach(() => {
		cy.login("a01284650@tec.mx", "123456");
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
	});
});
