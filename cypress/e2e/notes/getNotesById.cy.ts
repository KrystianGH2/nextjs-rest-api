describe("GET all /notes", () => {
    it("gets a list of notes", () => {

      cy.request("https://nextjs-rest-api-eight.vercel.app/api/notesById?userId=65c4d3da31a5b42a960e4b6c").then(
        (response) => {
          expect(response.status).to.equal(200);
          console.log(response.body);
        }
      );
    });
  });




  
  