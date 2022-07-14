const express = require("express");
const app = express();

// Router
const studentRouter = require("./routers/studentRouter");
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");

const morgan = require("morgan");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/my-students")
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("MongoDB Connection Failed!", err));

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/students", studentRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello from express js!");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
});

// Mongoose -> Model -> Collection
// Import Model
// Connect Database
