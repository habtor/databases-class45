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
const firstQ = `
SELECT paper_title, COUNT(author_paper.author_id) AS Number_OF_Authors
FROM research_Papers
JOIN author_paper ON author_paper.paper_id = research_Papers.paper_id
GROUP BY research_Papers.paper_title`;

// 2. Sum of the research papers published by all female authors.
const secondQ = `
SELECT COUNT(research_Papers.paper_title) AS Female_Authors
FROM research_Papers
JOIN author_paper ON author_paper.paper_id = research_Papers.paper_id
JOIN authors ON authors.author_id = author_paper.author_id
WHERE authors.gender = 'Female'`;

// 3. Average of the h-index of all authors per university.
const thirdQ = `SELECT authors.university, AVG(h_index)
FROM authors
GROUP BY authors.university`;

// 4. Sum of the research papers of the authors per university.
const fourthQ = `SELECT authors.university, COUNT(research_Papers.paper_title) Number_Of_Papers_per_Uni
FROM research_Papers 
JOIN author_paper ON author_paper.paper_id = research_Papers.paper_id
JOIN authors ON authors.author_id = author_paper.author_id
GROUP BY authors.university`;

// 5. Minimum and maximum of the h-index of all authors per university.
const fifthQ = `SELECT university, MIN(h_index),MAX(h_index)
FROM authors
GROUP BY authors.university`;

const queries = [firstQ, secondQ, thirdQ, fourthQ, fifthQ];

queries.forEach((query) => {
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.table(result);
  });
});

//============ Close connection
connection.end();
