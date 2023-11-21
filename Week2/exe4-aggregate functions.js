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

// 1. All research papers and the number of authors that wrote that paper.
const firstQ = ``;

// 2. Sum of the research papers published by all female authors.
const secondQ = ``;

// 3. Average of the h-index of all authors per university.
const thirdQ = ``;

// 4. Sum of the research papers of the authors per university.
const fourthQ = ``;

// 5. Minimum and maximum of the h-index of all authors per university.
const fifthQ = ``;

const queries = [firstQ];

queries.forEach((query) => {
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.table(result);
  });
});

//============ Close connection
connection.end();
