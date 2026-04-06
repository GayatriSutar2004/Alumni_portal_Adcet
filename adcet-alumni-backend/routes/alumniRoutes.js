const express = require("express");

const router = express.Router();

const alumniController = require("../controllers/alumniController");

const authenticateToken = require("../middleware/authMiddleware");

// GET all alumni
router.get("/alumni", authenticateToken, alumniController.getAlumni);

// GET alumni by ID
router.get("/alumni/:id", authenticateToken, alumniController.getAlumniById);

// ADD alumni
router.post("/alumni", authenticateToken, alumniController.addAlumni);

// UPDATE alumni
router.put("/alumni/:id", authenticateToken, alumniController.updateAlumni);

// DELETE alumni
router.delete("/alumni/:id", authenticateToken, alumniController.deleteAlumni);

// SEARCH alumni
router.get("/search-alumni", authenticateToken, alumniController.searchAlumni);

module.exports = router;