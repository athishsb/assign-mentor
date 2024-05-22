const Mentor = require('../models/mentorModel');
const Student = require('../models/studentModel');
const Assignment = require('../models/Assignment');


exports.changeMentorPage = async (req, res) => {
  try {
    const students = await Student.find();
    const mentors = await Mentor.find();

    res.status(200).send(`
      <h2 style="margin-bottom: 20px; text-align: center;">Change Mentor for a Student</h2>
      <div style="max-width: 600px; margin: 0 auto;">
        <form action="/change-mentor" method="post" style="padding: 20px; background-color: #f0f0f0; border-radius: 10px;">
          <div style="margin-bottom: 10px;">
            <label for="student">Select Student:</label><br>
            <select id="student" name="student" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
              ${students.map(student => `<option value="${student._id}">${student.student_name}</option>`).join('')}
            </select>
          </div>
          <div style="margin-bottom: 10px;">
            <label for="mentor">Select New Mentor:</label><br>
            <select id="mentor" name="mentor" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
              ${mentors.map(mentor => `<option value="${mentor._id}">${mentor.mentor_name}</option>`).join('')}
            </select>
          </div>
          <div style="text-align: center;">
            <button type="submit" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Change Mentor</button>
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


exports.changeMentor = async (req, res) => {
  try {
    const { student, mentor } = req.body;

    // Find the current assignment for the student
    const currentAssignment = await Assignment.findOne({ students: student });
    
    // If the student has a current assignment, remove the student from it and update previous_mentors
    if (currentAssignment) {
      // Get the current mentor ID
      const currentMentor = currentAssignment.mentor;

      // Move the current mentor to the list of previous mentors
      currentAssignment.students.pull(student);
      currentAssignment.previous_mentors.push({ student, mentor: currentMentor });
      await currentAssignment.save();
    }

    // Find or create an assignment for the new mentor
    let newAssignment = await Assignment.findOne({ mentor });
    if (newAssignment) {
      if (!newAssignment.students) {
        newAssignment.students = [];
      }
      newAssignment.students.push(student);
      await newAssignment.save();
    } else {
      newAssignment = new Assignment({ mentor, students: [student] });
      await newAssignment.save();
    }

    // Fetch the names of the student and the new mentor
    const studentName = await Student.findById(student).select('student_name');
    const mentorName = await Mentor.findById(mentor).select('mentor_name');

    // Send the response with the success message including the names
    res.status(201).send(`
      <h2 style="text-align: center; color: #4CAF50;">Mentor Changed Successfully!</h2>
      <p style="text-align: center;">Student: ${studentName.student_name}</p>
      <p style="text-align: center;">New Mentor: ${mentorName.mentor_name}</p>
      <div style="text-align: center;">
        <a href="/" style="text-decoration: none; background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px;">Back to Home</a>
      </div>
    `);
  } catch (error) {
    console.error('Error changing mentor:', error);
    res.status(500).send(`
      <h2 style="text-align: center; color: #ff6666;">Error Changing Mentor!</h2>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/change-mentor" style="text-decoration: none; background-color: #ff6666; color: white; padding: 10px 20px; border-radius: 5px;">Try Again</a>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/" style="text-decoration: none; background-color: #333; color: white; padding: 10px 20px; border-radius: 5px;">Back to Home</a>
      </div>
    `);
  }
};


