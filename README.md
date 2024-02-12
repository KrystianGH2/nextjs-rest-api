# Development Platform CA Report

This report details the frameworks and databases chosen for the development of a production-ready Restful-API,
covering the implementation of GET, POST, DELETE, and UPDATE endpoints. 
The primary choices include Next.js as the framework and MongoDB as the NoSQL database, Postman and Cypress for endpoint testing. 

#### Reasons for Next.js:

- I chose Next.js for its seamless integration with serverless functions, making it efficient for full-stack applications. It allows custom API routes within the application.

#### Reasons for MongoDB:

- I opted for MongoDB as my NoSQL database due to its easy learning curve, flexible schema, and JSON-like document storage.


<br>
<br>


## Endpoints and Queries

### GET, POST, PUT and DELETE
#### The database is organized into two collections: users and notes. These collections have a relational structure, indicating that a user can create multiple notes.

#### GET
```bash
http://localhost:3000/api/users
```
- This gets all the user stored in database. It returns users email and username, password is excluded from the query.
<br>

#### POST 
```bash
http://localhost:3000/api/users
```
- This request sends data to MongoDB using a POST method.
- It takes in a Schema with values of email, username and password. 

```
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, 
});
```
<br>

#### PATCH
```bash
http://localhost:3000/api/users
```
- This updates the users username using a PATCH method.
- The request takes in a userId and newUserName.
- As this procject focuses more on making apis side. Must manually pass the values to the body when making a request.
-  Postman was used to test the endpoint

```
{
    "userId": "65c20e3a20317fb5980c3468",
    "newUserName": "newUserName"
}
});
```
<br>

#### DELETE
```bash
http://localhost:3000/api/users?userId=65c1fd3220317fb5980c345d
```
- This deletes the user using a DELETE method.
- The user ID is included in the query parameter, allowing the endpoint to specifically handle data related to this user.

  <br>

### NOTES

#### GET
  ```bash
  http://localhost:3000/api/notes
  ```
- This fetches all the notes using GET method.
- Gets the notes of all users from the database.
- This returns id, title, description, and user(author)

<br>

#### GET BY ID
  ```bash
  http://localhost:3000/api/notesById?userId=65c4d3da31a5b42a960e4b6c
  ```
  - This gets the notes made by the specific user.
  - It takes in the users id in the query parameter.

<br>

#### POST
  ```bash
  http://localhost:3000/api/notesById?userId=65c4d3da31a5b42a960e4b6c
  ```
- Creates a new note using a POST method.
- It takes in the users id in the query parameter.
- The body takes in a title and a description of the note.
  
```
{
    "title": "Note title",
    "description": "Note description"
}
```

<br>

#### PATCH
 ```bash
  http://localhost:3000/api/notesById?userId=65c4d3da31a5b42a960e4b6c
  ```
- This updates the users note using a PATCH method.
- It takes in the users id in the query parameter.
- The body takes in the noteId, title, description as the values.
```
{
    "noteId": "65c4d75f31a5b42a960e4b79",
    "title": "Note title - Updated",
    "description":" Note description - Updated"
}
```
- The request returns the new values of the title and description. In this case "Updated" was added to both keys.

<br>

#### DELETE
 ```bash
  http://localhost:3000/api/notesById?userId=65c4d3da31a5b42a960e4b6c&noteId=65c4d953c38e717d3b20238d
  ```
- This deletes the note using DELETE method.
- The query parameters in the URL are used to specify which note to delete based on the user's ID and the note's ID.
- userID: Identifies the user whose note needs to be deleted.
- noteID: Specifies the particular note within that user's collection to be deleted.


  






