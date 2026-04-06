const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("ADCET Alumni Portal API running");
});

// Initialize database tables
app.get("/init-db", (req, res) => {
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
    db.query(createUsersTable, (err) => {
        if (err) return res.status(500).send("Error creating users table");
        db.query(createAlumniTable, (err) => {
            if (err) return res.status(500).send("Error creating alumni table");
            res.send("Database tables created successfully");
        });
    });
});

const userRoutes =
require("./routes/userRoutes");

const alumniRoutes =
require("./routes/alumniRoutes");


app.use("/api", userRoutes);

app.use("/api", alumniRoutes);


app.listen(5000, () => {
    console.log(
    "Server running on port 5000"
    );
});