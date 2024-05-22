const express = require('express');
const router = express.Router();
const changeMentorController = require('../controllers/changeMentorController');

// Display Change Mentor Page
router.get('/change-mentor', changeMentorController.changeMentorPage);

// Handle Change Mentor POST Request
router.post('/change-mentor', changeMentorController.changeMentor);

module.exports = router;
