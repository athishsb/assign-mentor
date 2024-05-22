const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  previous_mentors: [{ student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' } }]
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
