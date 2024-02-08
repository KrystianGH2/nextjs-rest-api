describe("GET all /notes", () => {
    it("gets a list of notes", () => {
      cy.request("https://nextjs-rest-api-eight.vercel.app/api/notes").then(
        (response) => {
          expect(response.status).to.equal(200);
          console.log(response.body);
        }
      );
    });
  });
  