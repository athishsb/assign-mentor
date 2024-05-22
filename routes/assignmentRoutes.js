const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

// Display Student Assignment Page
router.get('/assign-student', assignmentController.assignStudentPage);

// Handle Student Assignment POST Request
router.post('/assign-student', assignmentController.assignStudent);

module.exports = router;
