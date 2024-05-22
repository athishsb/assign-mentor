const mongoose = require("mongoose");

function connectToDatabase() {
  const DB_URL = process.env.DB_URL;
  const DB_NAME = process.env.DB_NAME;
  mongoose
    .connect(`${DB_URL}/${DB_NAME}`)
    .then((response) => {
      if (response) console.log("Database connection successful");
    })
    .catch((err) => console.log("Database connection failed", err));
}

module.exports = {
  connectToDatabase,
};
