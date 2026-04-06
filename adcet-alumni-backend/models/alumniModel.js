const db = require("../db");

const getAllAlumni = (callback) => {
    db.query("SELECT * FROM alumni", callback);
};

const addAlumni = (alumniData, callback) => {
    const { name, email, department, graduation_year, company, job_role, phone } = alumniData;
    const sql = `INSERT INTO alumni (name, email, department, graduation_year, company, job_role, phone) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [name, email, department, graduation_year, company, job_role, phone], callback);
};

const updateAlumni = (id, alumniData, callback) => {
    const { name, email, department, graduation_year, company, job_role, phone } = alumniData;
    const sql = `UPDATE alumni SET name = ?, email = ?, department = ?, graduation_year = ?, company = ?, job_role = ?, phone = ? WHERE id = ?`;
    db.query(sql, [name, email, department, graduation_year, company, job_role, phone, id], callback);
};

const deleteAlumni = (id, callback) => {
    db.query("DELETE FROM alumni WHERE id = ?", [id], callback);
};

const getAlumniById = (id, callback) => {
    db.query("SELECT * FROM alumni WHERE id = ?", [id], callback);
};

const searchAlumni = (name, callback) => {
    db.query("SELECT * FROM alumni WHERE name LIKE ?", [`%${name}%`], callback);
};

module.exports = {
    getAllAlumni,
    addAlumni,
    updateAlumni,
    deleteAlumni,
    getAlumniById,
    searchAlumni
};