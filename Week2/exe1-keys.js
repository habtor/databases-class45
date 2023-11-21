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

//============ Delete, create and select database if exist ============
const deleteDatabase = "DROP DATABASE IF EXISTS books";
const createDatabase = "CREATE DATABASE IF NOT EXISTS books";
const useDatabase = "USE books";
//=========== Create tables ============
const createAuthorTable = `CREATE TABLE authors(
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(255),
    university VARCHAR(255),
    date_of_birth DATE,
    h_index INT,
    gender VARCHAR(20)
    )`;

//====== Update authors table
const updateAuthorTable = `ALTER TABLE authors
    ADD COLUMN mentor INT,
    ADD CONSTRAINT foreignKey_mentor
    FOREIGN KEY (mentor) REFERENCES authors(author_id);`;

const queries = [
  deleteDatabase,
  createDatabase,
  useDatabase,
  createAuthorTable,
  updateAuthorTable,
];

queries.forEach((query) => {
  connection.query(query, (err) => {
    if (err) throw err;
    console.log("Query executed ");
  });
});

//============ Close connection
connection.end();
