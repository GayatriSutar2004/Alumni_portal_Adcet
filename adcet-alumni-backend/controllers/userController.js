const jwt = require("jsonwebtoken");
const db = require("../db");
const bcrypt = require("bcrypt");


exports.getUsers = (req, res) => {

    db.query(
        "SELECT * FROM users",
        (err, result) => {

            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }

        }
    );

};


exports.registerUser = async (req, res) => {

    const {
        name,
        email,
        password,
        graduation_year,
        department,
        role
    } = req.body;

    try {

        const hashedPassword =
        await bcrypt.hash(password, 10);

        const sql =
        `INSERT INTO users
        (name, email, password,
        graduation_year,
        department,
        role)
        VALUES (?, ?, ?, ?, ?, ?)`;

        db.query(
            sql,
            [
                name,
                email,
                hashedPassword,
                graduation_year,
                department,
                role
            ],
            (err, result) => {

                if (err) {

                    res.status(500)
                    .send("Error registering user");

                }
                else {

                    res.send(
                    "User registered successfully"
                    );

                }

            }
        );

    }
    catch (error) {

        res.status(500)
        .send("Server error");

    }

};




exports.loginUser = async (req, res) => {

    const {
        email,
        password
    } = req.body;

    const sql =
    "SELECT * FROM users WHERE email = ?";

    db.query(
        sql,
        [email],
        async (err, result) => {

            if (err) {

                res.status(500)
                .send("Server error");

            }
            else if (
                result.length === 0
            ) {

                res.send(
                "User not found"
                );

            }
            else {

                const user =
                result[0];

                const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

                if (isMatch) {

                   const token = jwt.sign(
                    {
                        id: user.id,
                        role: user.role
                    },
                    "secretkey",
                    {
                        expiresIn: "1h"
                    }
                );

                res.json({
                    message: "Login successful",
                    token: token
                });

                }
                else {

                    res.send(
                    "Wrong password"
                    );

                }

            }

        }
    );

};




//Update user profile

exports.updateProfile = (req, res) => {

    const authenticatedUserId = req.user.id;
    const userId = req.body.id || authenticatedUserId;

    const {
        name,
        email,
        company,
        job_role,
        phone,
        department,
        graduation_year
    } = req.body;

    const fields = [];
    const values = [];

    if (name !== undefined) {
        fields.push("name = ?");
        values.push(name);
    }
    if (email !== undefined) {
        fields.push("email = ?");
        values.push(email);
    }
    if (company !== undefined) {
        fields.push("company = ?");
        values.push(company);
    }
    if (job_role !== undefined) {
        fields.push("job_role = ?");
        values.push(job_role);
    }
    if (phone !== undefined) {
        fields.push("phone = ?");
        values.push(phone);
    }
    if (department !== undefined) {
        fields.push("department = ?");
        values.push(department);
    }
    if (graduation_year !== undefined) {
        fields.push("graduation_year = ?");
        values.push(graduation_year);
    }

    if (fields.length === 0) {
        return res.status(400).send("No fields to update");
    }

    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    values.push(userId);

    db.query(
        sql,
        values,
        (err, result) => {
            if (err) {
                res.status(500).send("Error updating profile");
            } else {
                res.send("Profile updated successfully");
            }
        }
    );

};




//Delete user (admin only)

exports.deleteUser = (req, res) => {

    const userId = req.params.id;

    const sql =
    "DELETE FROM users WHERE id = ?";

    db.query(
        sql,
        [userId],
        (err, result) => {

            if (err) {

                res.status(500)
                .send("Error deleting user");

            }
            else {

                res.send(
                "User deleted successfully"
                );

            }

        }
    );

};


//Get user by ID (admin only)

exports.getUserById = (req, res) => {

    const userId =
    req.params.id;

    const sql =
    "SELECT * FROM users WHERE id = ?";

    db.query(
        sql,
        [userId],
        (err, result) => {

            if (err) {

                res.status(500)
                .send("Error fetching user");

            }
            else {

                res.json(result);

            }

        }
    );

};



//Search users by name

exports.searchUsers = (req, res) => {

    const name =
    req.query.name;

    const sql =
    "SELECT * FROM users WHERE name LIKE ?";

    db.query(
        sql,
        [`%${name}%`],
        (err, result) => {

            if (err) {

                res.status(500)
                .send("Search error");

            }
            else {

                res.json(result);

            }

        }
    );

};



//Get users with pagination

exports.getCurrentUser = (req, res) => {
    const userId = req.user.id;
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) {
            res.status(500).send("Error fetching user");
        } else {
            res.json(result[0]);
        }
    });
};