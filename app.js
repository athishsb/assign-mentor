const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { connectToDatabase } = require("./config/db");
const mentorRoutes = require("./routes/mentorRoutes");
const homeRoutes = require("./routes/homeRoutes");
const studentRoutes = require("./routes/studentRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const changeMentorRoutes = require("./routes/changeMentorRoutes");
const mentorStudentsRoutes = require("./routes/mentorStudentsRoutes");
const previousMentorsRoutes = require("./routes/previousMentorsRoutes");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
connectToDatabase();

// Routes
app.use("/", homeRoutes);
app.use("/", mentorRoutes);
app.use("/", studentRoutes);
app.use("/", assignmentRoutes);
app.use("/", changeMentorRoutes);
app.use("/", mentorStudentsRoutes);
app.use("/", previousMentorsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
