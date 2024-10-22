const express = require("express");
const router = express.Router();
const authController = require('../../controllers/authController');

// Sign Up Route
router.post('/signup', authController.signup);
// Sign In Route
router.post('/signin', authController.signin);


module.exports = router;