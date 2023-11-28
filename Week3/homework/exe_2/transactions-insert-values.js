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
  `INSERT INTO account (account_number, balance)
    VALUES
    (101,1800),
    (102,4100),
    (104,6200),
    (105,2200),
    (106,2000),
    (107,3200)`,

  `INSERT INTO account_changes (account_number, amount, changed_date, remark)
  VALUES
  ( 101, 100, '2023-11-28', 'Deposit'),
  ( 102, -50, '2023-11-28', 'Withdrawal'),
  ( 104, 250, '2023-11-28', 'Transfer to account 101'),
  ( 107, 150, '2023-11-28', 'Transfer to account 104')`,
];

queries.forEach((query) => {
  connection.query(query, (err) => {
    if (err) throw err;
    console.log("Query executed ");
  });
});

connection.end();
