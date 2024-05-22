const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Display Student Creation Page
router.get('/create-student', studentController.createStudentPage);

// Handle Student Creation POST Request
router.post('/create-student', studentController.createStudent);

module.exports = router;
