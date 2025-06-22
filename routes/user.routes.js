// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Maps GET /api/search?email=... to the searchUser function
router.get('/search', userController.searchUser);

module.exports = router;
