describe("GET all /users", () => {
  it("gets a list of users", () => {
    cy.request("https://nextjs-rest-api-eight.vercel.app/api/users").then(
      (response) => {
        expect(response.status).to.equal(200);
        console.log(response.body);
      }
    );
  });
});
