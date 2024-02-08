describe("POST /notes", () => {
  it("creates a new note by user", () => {
    const title = "Note title" + " " + Math.floor(Math.random() * 900);
    const description =
      "Note description" + " " + Math.floor(Math.random() * 900);

    cy.request({
      method: "POST",
      url: "https://nextjs-rest-api-eight.vercel.app/api/notesById?userId=65c4d3da31a5b42a960e4b6c",
      body: {
        title: title,
        description: description,
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      console.log(response.body);
    });
  });
});
