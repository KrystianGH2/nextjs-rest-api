describe("DELETE NOTE", () => {
  it("creates a new note by user", () => {
    const title = "Note title" + " " + Math.floor(Math.random() * 900);
    const description =
      "Note description" + " " + Math.floor(Math.random() * 900);

    cy.request({
      method: "POST",
      url: "localhost:3000/api/notesById?userId=65c1fccf20317fb5980c345a",
      body: {
        title: title,
        description: description,
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      console.log(response.body.note);

      const noteId = response.body.note._id;

      cy.wait(3000);

      if (noteId) {
        cy.request({
          method: "DELETE",
          url: `localhost:3000/api/notesById?userId=65c1fccf20317fb5980c345a&noteId=${noteId}`,
        }).then((deleteResponse) => {
          expect(deleteResponse.status).to.equal(200);
          expect(deleteResponse.body).contains("Note deleted");
          console.log(deleteResponse.body);
        });
      }
    });
  });
});
