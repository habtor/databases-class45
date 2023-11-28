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
  console.log("Connected to database!");
});

//============ Start transaction
connection.beginTransaction((err) => {
  if (err) throw err;

  //============ Deduct 1000 from account 101
  connection.query(
    `UPDATE account SET balance = balance - 1000 WHERE account_number = 101`,
    (err) => {
      if (err) {
        connection.rollback(() => {
          throw err;
        });
      }
      //============ Add 1000 to account 102
      connection.query(
        `UPDATE account SET balance = balance + 1000 WHERE account_number = 102`,
        (err) => {
          if (err) {
            connection.rollback(() => {
              throw err;
            });
          }
          //============== Log the deduction
          connection.query(
            `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (101, -1000, CURRENT_TIMESTAMP, "Transfer to account 102")`,
            (err) => {
              if (err) {
                connection.rollback(() => {
                  throw err;
                });
              }
              //============== Log the addition
              connection.query(
                'INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (102, 1000, CURRENT_TIMESTAMP, "Transfer from account 101")',
                (err) => {
                  if (err) {
                    connection.rollback(() => {
                      throw err;
                    });
                  }

                  //============ Commit the transaction
                  connection.commit((err) => {
                    if (err) throw err;
                    console.log("The transaction was successful");
                
                    //============ End connection
                    connection.end();
                  });
                }
              );
            }
          );
        }
      );
    }
  );
});
