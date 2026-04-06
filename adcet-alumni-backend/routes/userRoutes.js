const express = require("express");

const router = express.Router();

const userController =
require("../controllers/userController");

const authenticateToken =
require("../middleware/authMiddleware");


// PUBLIC ROUTES

router.post(
    "/register",
    userController.registerUser
);

router.post(
    "/login",
    userController.loginUser
);


// PROTECTED ROUTES

router.get(
    "/users",
    authenticateToken,
    userController.getUsers
);

router.get(
    "/user/:id",
    authenticateToken,
    userController.getUserById
);

router.put(
    "/update-profile",
    authenticateToken,
    userController.updateProfile
);

router.delete(
    "/delete-user/:id",
    authenticateToken,
    userController.deleteUser
);

router.get(
    "/search",
    authenticateToken,
    userController.searchUsers
);

router.get(
    "/me",
    authenticateToken,
    userController.getCurrentUser
);


module.exports = router;