const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema(
  {
    mentor_name: { type: String, required: true },
    mentor_email: { type: String, required: true, unique: true },
  },
  { versionKey: false }
);

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
