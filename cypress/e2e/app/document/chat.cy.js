describe("Chat", () => {
	beforeEach(() => {
		cy.login("test1@test.com", "123Aa/");
		cy.wait(500);
		cy.visit(
			"http://localhost:3000/documento?id=36fe8a08-a30d-4f72-b215-92535da3d893",
		);
	});

	it("get past messages", () => {
		cy.intercept("POST", "/document/get_all_messages").as("getMessages");
		cy.wait("@getMessages").its("response.statusCode").should("eq", 200);
	});

	it("send message", () => {
		cy.intercept("POST", "/document/get_message").as("sendMessage");
		cy.get('input[data-test-id="chatInput"]').type(
			"What is this paper about?{enter}",
		);
		cy.wait("@sendMessage").its("response.statusCode").should("eq", 200);
	});

	it("display past messages", () => {
		cy.get('div[data-test-id="chatMessageItem"]')
			.its("length")
			.should("be.gt", 2);
	});

	it("highlight context chunk in paper", () => {
        // Wait for chat to load and scroll to the bottom
        cy.wait(500);

		// Highlight context chunk in paper
		cy.get('button[data-test-id="chatButtonHighlight"]').last().click();

		// Check if the context chunk is highlighted
		cy.get('p[data-test-id="paperItemParagraph"]')
			.filter(".bg-blueFrida-300")
			.its("length")
			.should("be.gt", 0);
	});
});
