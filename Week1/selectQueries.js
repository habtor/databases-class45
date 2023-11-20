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

//Q1- What are the names of countries with population greater than 8 million?
const q1 = "select name from country where population > 8000000";
connection.query(q1, (err, result) => {
  if (err) throw err;
  console.table(result);
});

//Q2- What are the names of countries that have “land” in their names?
const q2 = "select name from country where name like '%land%';";
connection.query(q2, (err, result) => {
  if (err) throw err;
  console.table(result);
});

//Q3- What are the names of the cities with population in between 500,000 and 1 million?
const q3 =
  "select name from country where population between 500000 and 1000000;";
connection.query(q3, (err, result) => {
  if (err) throw err;
  console.table(result);
});

//Q4- What's the name of all the countries on the continent ‘Europe’?
const q4 =
  "select name from country where continent = 'Europe'";
connection.query(q4, (err, result) => {
  if (err) throw err;
  console.table(result);
});

//Q5- List all the countries in the descending order of their surface areas.
const q5 =
  "select name from country order by surfacearea desc;";
connection.query(q5, (err, result) => {
  if (err) throw err;
  console.table(result);
});

//Q6- What are the names of all the cities in the Netherlands?
const q6 =
  "select name from city where countrycode = 'NLD';";
connection.query(q6, (err, result) => {
  if (err) throw err;
  console.table(result);
});

//Q7- What is the population of Rotterdam?
const q7 =
  "select population from city where name = 'Rotterdam';";
connection.query(q7, (err, result) => {
  if (err) throw err;
  console.table(result);
});

//Q8- What's the top 10 countries by Surface Area?
const q8 =
  "select name from country order by surfacearea desc limit 10";
connection.query(q8, (err, result) => {
  if (err) throw err;
  console.table(result);
});

//Q9- What's the top 10 most populated cities?
const q9 =
"select name from city order by population desc limit 10";
connection.query(q9, (err, result) => {
  if (err) throw err;
  console.table(result);
});

//Q10- What is the population number of the world?
const q10 =
"select sum(population) from country";
connection.query(q10, (err, result) => {
  if (err) throw err;
  console.table(result);
});


//============ Close connection
connection.end();
