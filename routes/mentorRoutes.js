const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');

// Display Mentor Creation Page
router.get('/create-mentor', mentorController.createMentorPage);

// Handle Mentor Creation POST Request
router.post('/create-mentor', mentorController.createMentor);

module.exports = router;
