describe("DELETE NOTE", () => {
  it("creates a new note by user", () => {
    const title = "Note title" + " " + Math.floor(Math.random() * 900);
    const description =
      "Note description" + " " + Math.floor(Math.random() * 900);

    cy.request({
      method: "POST",
      url: "https://nextjs-rest-api-eight.vercel.app/notesById?userId=65c4d3da31a5b42a960e4b6c",
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
          url: `https://nextjs-rest-api-eight.vercel.app/notesById?userId=65c4d3da31a5b42a960e4b6c&noteId=${noteId}`,
        }).then((deleteResponse) => {
          expect(deleteResponse.status).to.equal(200);
          expect(deleteResponse.body).contains("Note deleted");
          console.log(deleteResponse.body);
        });
      }
    });
  });
});
