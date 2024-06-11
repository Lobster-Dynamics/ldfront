describe("Chat", () => {
	beforeEach(() => {
		cy.login("a01284917@tec.mx", "123456");
		cy.wait(500);
		cy.visit(
			"http://localhost:3000/documento?id=98c4ea5c-7145-435c-ae57-a171ed98f9af",
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
});
