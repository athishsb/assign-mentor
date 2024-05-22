const express = require('express');
const router = express.Router();
const previousMentorController = require('../controllers/previousMentorController');

// Display Previous Mentor Page
router.get('/previous-mentor', previousMentorController.previousMentorPage);

// Handle Previous Mentor GET Request
router.get('/previous-mentor/details', previousMentorController.previousMentorDetails);

module.exports = router;
