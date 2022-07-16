const express = require("express");
const { Student } = require("../models/students");
const router = express.Router();
const authorize = require("../middlewares/authorize");

const studentList = async (req, res) => {
  try {
    const students = await Student.find().sort({ name: 1 }).select("name");
    res.send(students);
  } catch (err) {
    res.status(500).send(err);
  }
};

const newStudent = async (req, res) => {
  const student = new Student(req.body);
  try {
    const result = await student.save();
    res.send(result);
  } catch (err) {
    const errMsgs = [];
    for (field in err.errors) {
      errMsgs.push(err.errors[field].message);
    }
    return res.status(400).send(errMsgs);
  }
};

const studentDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findById(id);
    if (!student) return res.status(404).send("ID not found!");
    res.send(student);
  } catch (err) {
    return res.status(404).send("ID not found!");
  }
};

const studentUpdate = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const student = await Student.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!student) return res.status(404).send("ID not found!");
    res.send(student);
  } catch (err) {
    return res.status(404).send("ID not found!");
  }
};

const studentDelete = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) return res.status(404).send("ID not found!");
    res.send(student);
  } catch (err) {
    return res.status(404).send("ID not found!");
  }
};

router.route("/").get(authorize, studentList).post(newStudent);

router
  .route("/:id")
  .get(studentDetail)
  .put(studentUpdate)
  .delete(studentDelete);

module.exports = router;
