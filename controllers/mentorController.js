const Mentor = require("../models/mentorModel");

exports.createMentorPage = (req, res) => {
  res.status(200).send(`
    <h2 style="margin-bottom: 20px; text-align: center;">Create a Mentor</h2>
    <div style="max-width: 400px; margin: 0 auto;">
      <form action="/create-mentor" method="post" style="padding: 20px; background-color: #f0f0f0; border-radius: 10px;">
        <div style="margin-bottom: 10px;">
          <label for="mentorName">Mentor Name:</label><br>
          <input type="text" id="mentorName" name="mentorName" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
        </div>
        <div style="margin-bottom: 10px;">
          <label for="mentorEmail">Email:</label><br>
          <input type="email" id="mentorEmail" name="mentorEmail" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
        </div>
        <div style="text-align: center;">
          <button type="submit" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Create Mentor</button>
        </div>
      </form>
    </div>
    <div style="text-align: center; margin-top: 20px;">
      <a href="/" style="color: #333;">Back to Home</a>
    </div>
  `);
};

exports.createMentor = async (req, res) => {
  try {
    const { mentorName, mentorEmail } = req.body;
    const mentor = new Mentor({
      mentor_name: mentorName,
      mentor_email: mentorEmail,
    });
    await mentor.save();

    // Fetch all mentors after the new mentor is created
    const mentors = await Mentor.find();

    const mentorsListHTML = mentors.map(mentor => `
      <li style="margin-bottom: 10px; padding: 10px; background-color: #f0f0f0; border-radius: 5px;">
        <span style="font-weight: bold;">${mentor.mentor_name}</span> - ${mentor.mentor_email}
      </li>
    `).join('');

    res.status(201).send(`
      <h2 style="text-align: center; color: #4CAF50;">Mentor Created Successfully!</h2>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/" style="text-decoration: none; background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px;">Back to Home</a>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <h3>List of Mentors</h3>
        <ul style="list-style-type: none; padding: 0;">${mentorsListHTML}</ul>
      </div>
    `);
  } catch (error) {
    console.error("Error creating mentor:", error);
    res.status(500).send(`
      <h2 style="text-align: center; color: #ff6666;">Error Creating Mentor!</h2>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/create-mentor" style="text-decoration: none; background-color: #ff6666; color: white; padding: 10px 20px; border-radius: 5px;">Try Again</a>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/" style="text-decoration: none; background-color: #333; color: white; padding: 10px 20px; border-radius: 5px;">Back to Home</a>
      </div>
    `);
  }
};