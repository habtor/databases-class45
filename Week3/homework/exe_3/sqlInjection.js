const mysql = require("mysql");

//============ Connection parameters ============
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected...");
});

function getPopulation(Country, name, code, cb) {
  connection.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and Code2 = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result);
    }
  );
}

//============== Define the callback function
function cb(err, result) {
  if (err) {
    console.error("Error:", err.message);
  } else {
    console.log("Population:", result);
  }
}

// SQLi query
// getPopulation("country", "' OR 1=1 --", "", cb);
// getPopulation("country", "'OR '1'='1'", "AW", cb);
getPopulation("country", "OR 1=1", "OR 1=1", cb);
//=============
// getPopulation("country", "Aruba", "AW", cb);

connection.end();
