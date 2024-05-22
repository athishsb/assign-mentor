const Mentor = require('../models/mentorModel');
const Assignment = require('../models/Assignment');

exports.mentorStudentsPage = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).send(`
      <h2 style="margin-bottom: 20px; text-align: center;">View Students for a Mentor</h2>
      <div style="max-width: 600px; margin: 0 auto;">
        <form action="/mentor-students/list" method="get" style="padding: 20px; background-color: #f0f0f0; border-radius: 10px;">
          <div style="margin-bottom: 10px;">
            <label for="mentor">Select Mentor:</label><br>
            <select id="mentor" name="mentor" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
              ${mentors.map(mentor => `<option value="${mentor._id}">${mentor.mentor_name}</option>`).join('')}
            </select>
          </div>
          <div style="text-align: center;">
            <button type="submit" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">View Students</button>
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

exports.mentorStudentsList = async (req, res) => {
  try {
    const { mentor } = req.query;
    const assignments = await Assignment.find({ mentor }).populate('students');

    const mentorStudents = assignments.flatMap(assignment => assignment.students);

    let studentsListHTML = '';
    if (mentorStudents.length > 0) {
      studentsListHTML = mentorStudents.map(student => `
        <li style="margin-bottom: 10px; padding: 10px; background-color: #f0f0f0; border-radius: 5px;">
          <span style="font-weight: bold;">${student.student_name}</span> - ${student.student_email}
        </li>
      `).join('');
    } else {
      studentsListHTML = '<li>No students assigned to this mentor.</li>';
    }

    res.status(200).send(`
      <h2 style="margin-bottom: 20px; text-align: center;">Students for Mentor</h2>
      <div style="max-width: 600px; margin: 0 auto;">
        <ul style="list-style-type: none; padding: 0;">${studentsListHTML}</ul>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/mentor-students" style="color: #333;">Back to Select Mentor</a>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/" style="color: #333;">Back to Home</a>
      </div>
    `);
  } catch (error) {
    console.error('Error fetching mentor students:', error);
    res.status(500).send(`
      <h2 style="text-align: center; color: #ff6666;">Error Fetching Mentor Students!</h2>
      <div style="text-align: center;">
        <a href="/mentor-students" style="text-decoration: none; background-color: #ff6666; color: white; padding: 10px 20px; border-radius: 5px;">Try Again</a>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/" style="text-decoration: none; background-color: #333; color: white; padding: 10px 20px; border-radius: 5px;">Back to Home</a>
      </div>
    `);
  }
};