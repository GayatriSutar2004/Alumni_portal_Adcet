const db = require("../db");

/*
GET ALL ALUMNI (with pagination)
*/
exports.getAlumni = (req, res) => {

    const page =
    parseInt(req.query.page) || 1;

    const limit =
    parseInt(req.query.limit) || 10;

    const offset =
    (page - 1) * limit;

    const sql =
    "SELECT * FROM alumni LIMIT ? OFFSET ?";

    db.query(
        sql,
        [limit, offset],
        (err, result) => {

            if (err) {

                console.log(err);

                return res
                .status(500)
                .send(
                "Error fetching alumni"
                );

            }

            res.json(result);

        }
    );

};



/*
ADD ALUMNI
*/
exports.addAlumni = (req, res) => {

    const {
        name,
        email,
        department,
        graduation_year,
        phone
    } = req.body;

    const sql =
    `
    INSERT INTO alumni
    (name, email, department,
     graduation_year, phone)
    VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            name,
            email,
            department,
            graduation_year,
            phone
        ],
        (err, result) => {

            if (err) {

                console.log(err);

                return res
                .status(500)
                .json({
                    message:
                    "Error adding alumni"
                });

            }

            res.status(201).json({

                message:
                "Alumni added successfully"

            });

        }
    );

};



/*
UPDATE ALUMNI
*/
exports.updateAlumni = (req, res) => {

    const id =
    req.params.id;

    const {
        name,
        email,
        department,
        graduation_year,
        phone
    } = req.body;

    const sql =
    `
    UPDATE alumni
    SET
        name = ?,
        email = ?,
        department = ?,
        graduation_year = ?,
        phone = ?
    WHERE id = ?
    `;

    db.query(
        sql,
        [
            name,
            email,
            department,
            graduation_year,
            phone,
            id
        ],
        (err, result) => {

            if (err) {

                console.log(err);

                return res
                .status(500)
                .json({
                    message:
                    "Update failed"
                });

            }

            res.json({

                message:
                "Alumni updated successfully"

            });

        }
    );

};



/*
DELETE ALUMNI
*/
exports.deleteAlumni = (req, res) => {

    const id =
    req.params.id;

    const sql =
    "DELETE FROM alumni WHERE id = ?";

    db.query(
        sql,
        [id],
        (err, result) => {

            if (err) {

                console.log(err);

                return res
                .status(500)
                .send(
                "Error deleting alumni"
                );

            }

            res.send(
            "Alumni deleted successfully"
            );

        }
    );

};



/*
GET ALUMNI BY ID
*/
exports.getAlumniById = (req, res) => {

    const id =
    req.params.id;

    const sql =
    "SELECT * FROM alumni WHERE id = ?";

    db.query(
        sql,
        [id],
        (err, result) => {

            if (err) {

                console.log(err);

                return res
                .status(500)
                .send(
                "Error fetching alumni"
                );

            }

            res.json(result);

        }
    );

};



/*
SEARCH ALUMNI
*/
exports.searchAlumni = (req, res) => {

    const name =
    req.query.name;

    const sql =
    "SELECT * FROM alumni WHERE name LIKE ?";

    db.query(
        sql,
        [`%${name}%`],
        (err, result) => {

            if (err) {

                console.log(err);

                return res
                .status(500)
                .send(
                "Search error"
                );

            }

            res.json(result);

        }
    );

};