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

//============ select database============
const useDatabase = "USE books";

//====== Create papers table
const createResearchPapersTable = `CREATE TABLE IF NOT EXISTS research_Papers(
    paper_id INT AUTO_INCREMENT PRIMARY KEY,
    paper_title VARCHAR(255),
    conference VARCHAR(255),
    publish_date DATE
    )`;
//====== Create author_papers table
const createAuthorPapersTable = `CREATE TABLE IF NOT EXISTS author_paper( 
    author_id INT,
    paper_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id),
    PRIMARY KEY (author_id, paper_id)
    )`;

//===== Insert
const insertToAuthors = `INSERT INTO authors (
    author_name, university, date_of_birth, h_index, gender,mentor) 
    VALUES
    ('Alice Smith', 'XYZ University', '1990-05-15', 7, 'Female',NULL),
    ('John Doe', 'ABC University', '1985-08-25', 6, 'Male',1),
    ('Sarah Johnson', 'DEF University', '1994-03-10', 5, 'Female',2),
    ('Robert Williams', 'UVW University', '1989-11-18', 9, 'Male',3),
    ('Emma Brown', 'LMN University', '1991-07-30', 8, 'Female',4),
    ('William Garcia', 'JKL University', '1987-12-22', 7, 'Male',5),
    ('Olivia Martinez', 'PQR University', '1996-04-05', 6, 'Female',6),
    ('James Rodriguez', 'STU University', '1993-09-08', 10, 'Male',7),
    ('Sophia Lee', 'MNO University', '1986-06-14', 5, 'Female',8),
    ('Daniel Nguyen', 'GHI University', '1997-01-20', 8, 'Male',9),
    ('Isabella Kim', 'IJK University', '1990-08-03', 9, 'Female',8),
    ('Michael Chen', 'EFG University', '1988-02-28', 7, 'Male',9),
    ('Grace Miller', 'MNO University', '1995-12-12', 6, 'Female',10),
    ('Alexander Park', 'ABC University', '1992-10-17', 8, 'Male',11),
    ('Ava Taylor', 'PQR University', '1993-05-28', 7, 'Female',14)`;

const insertToPapers = `INSERT INTO research_Papers 
    (paper_title, conference, publish_date)
    VALUES
    ('Blockchain Technology', 'Tech Summit 2022', '2022-09-05'),
    ('Cybersecurity Measures', 'Security Conference 2021', '2021-08-15'),
    ('Quantum Computing Advancements', 'Science Forum 2022', '2022-06-30'),
    ('AI Ethics in Healthcare', 'Medical Summit 2021', '2021-11-28'),
    ('Space Exploration Innovations', 'Space Conference 2022', '2022-04-18'),
    ('Advancements in Nanotechnology', 'Nanotech Expo 2021', '2021-07-05'),
    ('Renewable Energy Solutions', 'Energy Symposium 2022', '2022-10-22'),
    ('Future of Augmented Reality', 'Tech Expo 2021', '2021-09-12'),
    ('Ethical AI Applications', 'Ethics Forum 2022', '2022-08-08'),
    ('Biotechnology Breakthroughs', 'BioTech Conference 2021', '2021-12-30'),
    ('Advances in Quantum Cryptography', 'Security Summit 2022', '2022-03-25'),
    ('Sustainable Agriculture Practices', 'Agriculture Expo 2021', '2021-06-14'),
    ('Human-Computer Interaction Trends', 'HCI Symposium 2022', '2022-01-17'),
    ('Digital Transformation Strategies', 'Tech Forum 2021', '2021-02-28'),
    ('Robotics in Industry 4.0', 'Robotics Conference 2022', '2022-05-08'),
    ('Healthcare Data Analytics', 'Health Data Summit 2021', '2021-03-20'),
    ('Advances in Materials Science', 'Materials Expo 2022', '2022-12-12'),
    ('Smart City Innovations', 'Urban Tech Summit 2021', '2021-10-01'),
    ('Climate Change Mitigation', 'Climate Conference 2022', '2022-07-24'),
    ('Innovations in Wearable Tech', 'Wearable Tech Expo 2021', '2021-04-09'),
    ('Neuroscience Research Breakthroughs', 'Neuroscience Forum 2022', '2022-11-03'),
    ('Advancements in Quantum Mechanics', 'Physics Symposium 2021', '2021-08-21'),
    ('AI Applications in Finance', 'Fintech Summit 2022', '2022-09-15'),
    ('Biometric Security Solutions', 'Security Tech Conference 2021', '2021-05-29'),
    ('Future of Transportation', 'Transportation Expo 2022', '2022-06-09'),
    ('Advances in 3D Printing', '3D Printing Symposium 2021', '2021-12-05'),
    ('Medical Imaging Technologies', 'Medical Imaging Conference 2022', '2022-03-01'),
    ('Future', 'Expo 2022', '2022-11-10'),
    ('Robotics', 'Robotics Expo 2021', '2021-11-12'),
    ('Imaging Technologies', 'Imaging Expo 2021', '2021-10-12')`;

const insertToJunctionTable = `INSERT INTO author_paper 
(author_id,paper_id)
VALUES
(1,2),(2,1),(1,10),(1,5),(2,6),(7,4),(5,5),(6,5),(5,6),(12,1),(1,13),(13,25),
(14,26),(11,23),(9,20),(4,18),(10,27),(8,21),(3,16),(3,17),(6,19),(7,22),(9,24),
(2,3),(3,4),(4,5),(5,7),(6,8),(7,9),(8,11),(9,12),(10,14),(11,15),(12,16),(13,18),
(14,19),(1,20),(2,21),(3,22),(4,23),(5,24),(6,25),(7,26),(8,27),(9,28),(10,29),(11,30)`;

const queries = [
  useDatabase,
  createResearchPapersTable,
  createAuthorPapersTable,
  insertToAuthors,
  insertToPapers,
  insertToJunctionTable,
];

queries.forEach((query) => {
  connection.query(query, (err) => {
    if (err) throw err;
    console.log("Query executed ");
  });
});

//============ Close connection
connection.end();
