const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./app");

// Connect to MongoDB
mongoose
  .connect("mongodb://0.0.0.0:27017/my-students")
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("MongoDB Connection Failed!", err));

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
});
