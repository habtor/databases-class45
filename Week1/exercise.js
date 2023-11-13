const mysql = require("mysql");

//============ Connection parameters ============
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  //   database: "meetup",
});

//============ Connection statment ============
connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected...");
});

//============ Delete database if exist ============
const deleteDatabase = "drop database if exists meetup";
connection.query(deleteDatabase, (err) => {
  if (err) throw err;
  console.log("Database deleted...");
});

//============ Create the datbase ============
const createDatabase = "create database if not exists meetup;";
connection.query(createDatabase, (err) => {
  if (err) throw err;
  console.log("Database created...");
});

//============ Select the datbase ============
const useDatabase = "use meetup";
connection.query(useDatabase, (err) => {
  if (err) throw err;
  console.log("Database selected...");
});

//============ Create tables ==============================
//============ Create invitee table
const createInviteeTable =
  "CREATE TABLE IF NOT EXISTS Invitee(invitee_no INT,invitee_name VARCHAR(255),invited_by VARCHAR(255))";
connection.query(createInviteeTable, (err) => {
  if (err) throw err;
  console.log("Invitee table created...");
});

//============ Create room table
const createRoomTable =
  "CREATE TABLE IF NOT EXISTS Room(room_no INT, room_name VARCHAR(255), floor_number INT)";
connection.query(createRoomTable, (err) => {
  if (err) throw err;
  console.log("Room table created...");
});

//============ Create meeting table
const createMeetingTable =
  "CREATE TABLE IF NOT EXISTS Meeting(meeting_no INT, meeting_title VARCHAR(255), starting_time TIME, ending_time TIME, room_no INT)";
connection.query(createMeetingTable, (err) => {
  if (err) throw err;
  console.log("Meeting table created...");
});

//============ Insert to tables ==========================
//============ Insert to invitee
const insertDataToInvitee = (values) => {
  const inviteeInsertQuery =
    "insert into invitee (invitee_no,invitee_name,invited_by) values ?";
  connection.query(inviteeInsertQuery, [values], (err) => {
    if (err) throw err;
    console.log("Data added to invitee table...");
  });
};

//============ Insert to meeting
const insertDataTomeeting = (values) => {
  const meetingInsertQuery =
    "insert into meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) values ?";
  connection.query(meetingInsertQuery, [values], (err) => {
    if (err) throw err;
    console.log("Data added to meeting table...");
  });
};
//============ Insert to room
const insertDataToRoom = (values) => {
  const roomInsertQuery =
    "insert into room (room_no, room_name, floor_number) values ?";
  connection.query(roomInsertQuery, [values], (err) => {
    if (err) throw err;
    console.log("Data added to room table...");
  });
};

//============ Create dummy values
for (let i = 1; i <= 5; i++) {
  const roomValues = [[i, `Room ${i}`, 13]];
  const meetingValues = [
    [i, `Monday meeting ${i}`, `1${i}:00:00`, `1${i + 1}:00:00`, 2],
  ];
  const inviteeValues = [[i, `Mark the ${i}`, `John the ${i + 1}`]];
  insertDataToRoom(roomValues);
  insertDataTomeeting(meetingValues);
  insertDataToInvitee(inviteeValues);
}

//============ Close connection
connection.end();
