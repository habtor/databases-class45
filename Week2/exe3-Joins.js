const mysql = require("mysql");

//============ Connection parameters ============
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

//============ Connection statment ============
connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected...");
});

connection.query("USE books", (err) => {
  if (err) throw err;
  console.log("Database selected...");
});

// 1. Write a query that prints names of all authors and their corresponding mentors.
const firstQ = `SELECT authors.author_name Author, mentors.author_name as Mentor
FROM authors
LEFT JOIN authors mentors ON authors.mentor = mentors.author_id;`;

// 2. Write a query that prints all columns of authors and their published paper_title. 
// If there is an author without any research_Papers, print the information of that author too.
const secondQ = ``;

const queries = [firstQ, secondQ];

queries.forEach((query) => {
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.table(result);
  });
});

//============ Close connection
connection.end();
