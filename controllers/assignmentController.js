const Mentor = require('../models/mentorModel');
const Student = require('../models/studentModel');
const Assignment = require('../models/Assignment');

exports.assignStudentPage = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    const assignedStudents = await Assignment.find().distinct('students');
    const unassignedStudents = await Student.find({ _id: { $nin: assignedStudents } });
    
    res.status(200).send(`
      <h2 style="margin-bottom: 20px; text-align: center;">Assign Students to Mentor</h2>
      <div style="max-width: 600px; margin: 0 auto;">
        <form action="/assign-student" method="post" style="padding: 20px; background-color: #f0f0f0; border-radius: 10px;">
          <div style="margin-bottom: 10px;">
            <label for="mentor">Select Mentor:</label><br>
            <select id="mentor" name="mentor" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
              ${mentors.map(mentor => `<option value="${mentor._id}">${mentor.mentor_name}</option>`).join('')}
            </select>
          </div>
          <div style="margin-bottom: 10px;">
            <label>Select Students:</label><br>
            ${unassignedStudents.map(student => `
              <div style="margin-bottom: 5px;">
                <input type="checkbox" id="student_${student._id}" name="students" value="${student._id}">
                <label for="student_${student._id}">${student.student_name}</label>
              </div>
            `).join('')}
          </div>
          <div style="text-align: center;">
            <button type="submit" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Assign Students</button>
          </div>
        </form>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/" style="color: #333;">Back to Home</a>
      </div>
    `);
  } catch (error) {
    console.error('Error loading page:', error);
    res.status(500).send(`
      <h2 style="text-align: center; color: #ff6666;">Error Loading Page!</h2>
      <div style="text-align: center;">
        <a href="/" style="text-decoration: none; background-color: #ff6666; color: white; padding: 10px 20px; border-radius: 5px;">Back to Home</a>
      </div>
    `);
  }
};

exports.assignStudent = async (req, res) => {
  try {
    const { mentor } = req.body;
    const students = Array.isArray(req.body.students) ? req.body.students : [req.body.students];
    
    let assignment = await Assignment.findOne({ mentor });
    if (assignment) {
      assignment.students.push(...students);
    } else {
      assignment = new Assignment({ mentor, students });
    }
    await assignment.save();

    // Fetch all assignments and populate mentor and students
    const assignments = await Assignment.find().populate('mentor students');

    // Generate the HTML for the list of mentors and their assigned students
    const assignmentsListHTML = assignments.map(assign => `
      <div style="margin-bottom: 20px; padding: 10px; background-color: #f0f0f0; border-radius: 5px;">
        <p><strong>Mentor:</strong> ${assign.mentor.mentor_name} (${assign.mentor.mentor_email})</p>
        <p><strong>Students:</strong></p>
        <ul style="list-style-type: none; padding: 0;">
          ${assign.students.map(student => `
            <li>${student.student_name} (${student.student_email})</li>
          `).join('')}
        </ul>
      </div>
    `).join('');

    res.status(201).send(`
      <h2 style="text-align: center; color: #4CAF50;">Students Assigned Successfully!</h2>
      <div style="text-align: center;">
        <a href="/" style="text-decoration: none; background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px;">Back to Home</a>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <h3>List of Mentors and Their Assigned Students</h3>
        ${assignmentsListHTML}
      </div>
    `);
  } catch (error) {
    console.error('Error assigning students:', error);
    res.status(500).send(`
      <h2 style="text-align: center; color: #ff6666;">Error Assigning Students!</h2>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/assign-student" style="text-decoration: none; background-color: #ff6666; color: white; padding: 10px 20px; border-radius: 5px;">Try Again</a>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/" style="text-decoration: none; background-color: #333; color: white; padding: 10px 20px; border-radius: 5px;">Back to Home</a>
      </div>
    `);
  }
};
