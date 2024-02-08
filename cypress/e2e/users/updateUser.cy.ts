describe("PATCH user", () => {
  it("Updates a user's username", () => {
    const userId = "65c4f2fa6a2ec9387cc08a38";
    const newUsername =
      "RandomUser" + Math.floor(Math.random() * 900) + "- Updated";

    cy.request({
      method: "PATCH",
      url: "https://nextjs-rest-api-eight.vercel.app/api/users",
      body: {
        userId: userId,
        newUserName: newUsername,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).contains("Username updated successfully");

      console.log(response.body);
    });
  });
});
