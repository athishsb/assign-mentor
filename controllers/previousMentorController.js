const Assignment = require("../models/Assignment");
const Student = require("../models/studentModel");

exports.previousMentorPage = async (req, res) => {
  try {
    // Find students who have previous mentors
    const studentsWithPreviousMentors = await Assignment.distinct(
      "previous_mentors.student"
    );

    // Find details of these students
    const students = await Student.find({
      _id: { $in: studentsWithPreviousMentors },
    });

    res.status(200).send(`
      <h2 style="margin-bottom: 20px; text-align: center;">View Previous Mentor for a Student</h2>
      <div style="max-width: 600px; margin: 0 auto;">
        <form action="/previous-mentor/details" method="get" style="padding: 20px; background-color: #f0f0f0; border-radius: 10px;">
          <div style="margin-bottom: 10px;">
            <label for="student">Select Student:</label><br>
            <select id="student" name="student" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
              ${students
                .map(
                  (student) =>
                    `<option value="${student._id}">${student.student_name}</option>`
                )
                .join("")}
            </select>
          </div>
          <div style="text-align: center;">
            <button type="submit" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">View Previous Mentor</button>
          </div>
        </form>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/" style="color: #333;">Back to Home</a>
      </div>
    `);
  } catch (error) {
    console.error("Error loading page:", error);
    res.status(500).send(`
      <h2 style="text-align: center; color: #ff6666;">Error Loading Page!</h2>
      <div style="text-align: center;">
        <a href="/" style="text-decoration: none; background-color: #ff6666; color: white; padding: 10px 20px; border-radius: 5px;">Back to Home</a>
      </div>
    `);
  }
};

exports.previousMentorDetails = async (req, res) => {
  try {
    const { student } = req.query;

    // Find the assignment with the specified student and sort previous_mentors array in descending order by _id
    const assignment = await Assignment.findOne({
      "previous_mentors.student": student,
    })
      .sort({ "previous_mentors._id": -1 })
      .populate("previous_mentors.mentor");

    if (!assignment) {
      return res.status(404).send(`
        <h2 style="text-align: center; color: #ff6666;">Student Not Found!</h2>
        <div style="text-align: center;">
          <a href="/previous-mentor" style="text-decoration: none; background-color: #ff6666; color: white; padding: 10px 20px; border-radius: 5px;">Try Again</a>
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <a href="/" style="text-decoration: none; background-color: #333; color: white; padding: 10px 20px; border-radius: 5px;">Back to Home</a>
        </div>
      `);
    }

    // Get the most recent entry from the previous_mentors array
    const previousMentor = assignment.previous_mentors[0].mentor;

    res.status(200).send(`
      <h2 style="margin-bottom: 20px; text-align: center;">Previous Mentor for Student</h2>
      <div style="max-width: 600px; margin: 0 auto;">
        <div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
          <p style="font-weight: bold;">Mentor Name: ${previousMentor.mentor_name}</p>
          <p style="margin-top: 5px;">Mentor Email: ${previousMentor.mentor_email}</p>
        </div>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/previous-mentor" style="color: #333;">Back to Select Student</a>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/" style="color: #333;">Back to Home</a>
      </div>
    `);
  } catch (error) {
    console.error("Error fetching previous mentor:", error);
    res.status(500).send(`
      <h2 style="text-align: center; color: #ff6666;">Error Fetching Previous Mentor!</h2>
      <div style="text-align: center;">
        <a href="/previous-mentor" style="text-decoration: none; background-color: #ff6666; color: white; padding: 10px 20px; border-radius: 5px;">Try Again</a>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/" style="text-decoration: none; background-color: #333; color: white; padding: 10px 20px; border-radius: 5px;">Back to Home</a>
      </div>
    `);
  }
};
