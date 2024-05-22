const Student = require('../models/studentModel');

exports.createStudentPage = (req, res) => {
  res.status(200).send(`
    <h2 style="margin-bottom: 20px; text-align: center;">Create a Student</h2>
    <div style="max-width: 400px; margin: 0 auto;">
      <form action="/create-student" method="post" style="padding: 20px; background-color: #f0f0f0; border-radius: 10px;">
        <div style="margin-bottom: 10px;">
          <label for="studentName">Student Name:</label><br>
          <input type="text" id="studentName" name="studentName" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
        </div>
        <div style="margin-bottom: 10px;">
          <label for="studentEmail">Email:</label><br>
          <input type="email" id="studentEmail" name="studentEmail" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
        </div>
        <div style="text-align: center;">
          <button type="submit" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Create Student</button>
        </div>
      </form>
    </div>
    <div style="text-align: center; margin-top: 20px;">
      <a href="/" style="color: #333;">Back to Home</a>
    </div>
  `);
};

exports.createStudent = async (req, res) => {
  try {
    const { studentName, studentEmail } = req.body;
    const student = new Student({
      student_name: studentName,
      student_email: studentEmail
    });
    await student.save();

    // Fetch all students after the new student is created
    const students = await Student.find();

    const studentsListHTML = students.map(student => `
      <li style="margin-bottom: 10px; padding: 10px; background-color: #f0f0f0; border-radius: 5px;">
        <span style="font-weight: bold;">${student.student_name}</span> - ${student.student_email}
      </li>
    `).join('');

    res.status(201).send(`
      <h2 style="text-align: center; color: #4CAF50;">Student Created Successfully!</h2>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/" style="text-decoration: none; background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px;">Back to Home</a>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <h3>List of Students</h3>
        <ul style="list-style-type: none; padding: 0;">${studentsListHTML}</ul>
      </div>
    `);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).send(`
      <h2 style="text-align: center; color: #ff6666;">Error Creating Student!</h2>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/create-student" style="text-decoration: none; background-color: #ff6666; color: white; padding: 10px 20px; border-radius: 5px;">Try Again</a>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/" style="text-decoration: none; background-color: #333; color: white; padding: 10px 20px; border-radius: 5px;">Back to Home</a>
      </div>
    `);
  }
};
