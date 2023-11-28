const mysql = require("mysql");

//============ Connection parameters ============
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "bank",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected...");
});

const queries = [
  `CREATE DATABASE IF NOT EXISTS bank`,
  `CREATE TABLE IF NOT EXISTS account(
    account_number INT PRIMARY KEY,
    balance INT)`,
  `CREATE TABLE IF NOT EXISTS account_changes(
    change_number INT PRIMARY KEY AUTO_INCREMENT,
    account_number INT,
    amount INT,
    changed_date DATE,
    remark TEXT,
    FOREIGN KEY (account_number) REFERENCES account(account_number))`,
];

queries.forEach((query) => {
  connection.query(query, (err) => {
    if (err) throw err;
    console.log("Query executed ");
  });
});

connection.end();
