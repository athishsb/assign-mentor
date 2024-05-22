const express = require('express');
const router = express.Router();
const mentorStudentsController = require('../controllers/mentorStudentsController');

// Display Mentor Students Page
router.get('/mentor-students', mentorStudentsController.mentorStudentsPage);

// Handle Mentor Students GET Request
router.get('/mentor-students/list', mentorStudentsController.mentorStudentsList);

module.exports = router;
