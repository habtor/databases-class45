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

//============ Delete, create and select database and tables ============
const queries = [
  "DROP DATABASE IF EXISTS meetup",
  "CREATE DATABASE IF NOT EXISTS meetup",
  "USE meetup",
  `CREATE TABLE IF NOT EXISTS Invitee 
    (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    invitee_no INT,
    invitee_name VARCHAR(255),
    invited_by VARCHAR(255)
  )`,
  `CREATE TABLE IF NOT EXISTS Room 
   (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    room_no INT,
    room_name VARCHAR(255),
    floor_number INT
  )`,
  `CREATE TABLE IF NOT EXISTS Meeting (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, 
    meeting_no INT,
    meeting_title VARCHAR(255),
    starting_time TIME,
    ending_time TIME,
    room_no INT
  )`,
];

queries.forEach((query) => {
  connection.query(query, (err) => {
    if (err) throw err;
    console.log("Query executed successfully...");
  });
});

//=========== Insert function
const insertData = (table, columns, values) => {
  const insertQuery = `INSERT INTO ${table} (${columns.join(", ")}) values ?`;
  connection.query(insertQuery, [values], (err) => {
    if (err) throw err;
    console.log(`Data added to ${table} table...`);
  });
};

//============ Insert to invitee
const insertDataToInvitee = (values) => {
  insertData("invitee", ["invitee_no", "invitee_name", "invited_by"], values);
};

//============ Insert to meeting
const insertDataToMeeting = (values) => {
  insertData(
    "meeting",
    ["meeting_no", "meeting_title", "starting_time", "ending_time", "room_no"],
    values
  );
};

//============ Insert to room
const insertDataToRoom = (values) => {
  insertData("room", ["room_no", "room_name", "floor_number"], values);
};

//============ Create dummy values
for (let i = 1; i <= 5; i++) {
  const roomValues = [[i, `Room ${i}`, 13]];
  const meetingValues = [
    [i, `Monday meeting ${i}`, `1${i}:00:00`, `1${i + 1}:00:00`, 2],
  ];
  const inviteeValues = [[i, `Mark the ${i}`, `John the ${i + 1}`]];
  insertDataToRoom(roomValues);
  insertDataToMeeting(meetingValues);
  insertDataToInvitee(inviteeValues);
}

//============ Close connection
connection.end();
