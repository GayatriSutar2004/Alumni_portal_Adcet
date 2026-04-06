const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "adcet_alumni_portal"
});

connection.connect((err) => {
    if (err) {
        console.log("Database connection failed");
    } else {
        console.log("Connected to MySQL");
        // Initialize tables
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                graduation_year INT,
                department VARCHAR(255),
                role VARCHAR(50) DEFAULT 'alumni',
                company VARCHAR(255),
                job_role VARCHAR(255),
                phone VARCHAR(20)
            )
        `;
        const createAlumniTable = `
            CREATE TABLE IF NOT EXISTS alumni (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255),
                department VARCHAR(255),
                graduation_year INT,
                company VARCHAR(255),
                job_role VARCHAR(255),
                phone VARCHAR(20)
            )
        `;
        connection.query(createUsersTable, (err) => {
            if (err) console.log("Error creating users table:", err);
            else console.log("Users table ready");
        });
        connection.query(createAlumniTable, (err) => {
            if (err) console.log("Error creating alumni table:", err);
            else console.log("Alumni table ready");
        });
    }
});

module.exports = connection;