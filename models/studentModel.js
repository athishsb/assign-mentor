const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    student_name: { type: String, required: true },
    student_email: { type: String, required: true, unique: true },
  },
  { versionKey: false }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
