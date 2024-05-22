exports.homePage = (req, res) => {
    res.status(200).send(`
      <h1 style="background-color:#66ccff;padding:10px 0;text-align:center">Express Server is Connected!</h1>
      <div style="text-align:center">
        <p><span style="background-color:#99ff99;font-size:22px">1. To Create a Mentor</span> --> <a href="/create-mentor">Click Here</a></p>
        <p><span style="background-color:#ffcc00;font-size:22px">2. To Create a Student</span> --> <a href="/create-student">Click Here</a></p>
        <p><span style="background-color:#99ccff;font-size:22px">3. To Assign a Student to a Mentor</span> --> <a href="/assign-student">Click Here</a></p>
        <p><span style="background-color:#ff6666;font-size:22px">4. To Change Mentor for a Student</span> --> <a href="/change-mentor">Click Here</a></p>
        <p><span style="background-color:#ff9999;font-size:22px">5. To Show All Students for a Mentor</span> --> <a href="/mentor-students">Click Here</a></p>
        <p><span style="background-color:#ffff99;font-size:22px">6. To Show Previously Assigned Mentor for a Student</span> --> <a href="/previous-mentor">Click Here</a></p>
      </div>
    `);
  };
  