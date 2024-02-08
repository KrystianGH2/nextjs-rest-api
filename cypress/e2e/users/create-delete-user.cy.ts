describe("POST /users", () => {
  it("creates a new user and deletes after 3 seconds", () => {
    const userName = "RandomUser" + Math.floor(Math.random() * 900);
    const email = "user" + Math.floor(Math.random() * 900) + "@user.com";

    const newUser = {
      email: email,
      username: userName,
      password: "newpassword",
    };

    let userId; // Declare userId variable to store the created user's ID

    cy.request({
      method: "POST",
      url: "https://nextjs-rest-api-eight.vercel.app/api/users",
      body: newUser,
    }).then((response) => {
      expect(response.status).to.equal(201);

      // Store the userId for later use
      userId = response.body.user._id;

      console.log("User _id:", userId);

      // Wait for 3 seconds
      cy.wait(3000);

      // Delete the user
      if (userId) {
        cy.request({
          method: "DELETE",
          url: `https://nextjs-rest-api-eight.vercel.app/api/users?userId=${userId}`,
        }).then((deleteResponse) => {
          expect(deleteResponse.status).to.equal(200);
          console.log("User deleted successfully");
        });
      }
    });
  });
});
