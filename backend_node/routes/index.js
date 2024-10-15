const express = require('express');
const router = express.Router();

// Import versioned routes
const authV1 = require('./v1/auth');

// Use the versioned routes
router.use('/v1/auth', authV1);


module.exports = router;
