// Express
const express = require("express");
const db = require("./db");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("I am middleware !");
  next();
});

app.get("/", (request, response) => {
  response.send("Hello from express js!");
});

// GET => List
// GET detail => students/2
// POST

app.get("/api/students", (req, res) => {
  db.getDbStudents().then((students) => {
    res.send(students);
  });
});

app.post("/api/students", (req, res) => {
  const student = req.body;
  db.getDbStudents().then((students) => {
    students.push(student);
    db.insertDbStudent(students).then((data) => {
      res.send(student);
    });
  });
});

app.get("/api/students/:id", (req, res) => {
  const id = req.params.id;
  db.getDbStudents().then((students) => {
    const student = students.find((student) => student.id === parseInt(id));
    if (!student) {
      res.status(404).send("Student not found");
    } else {
      res.send(student);
    }
  });
});

app.put("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  db.getDbStudents().then((students) => {
    const student = students.find((student) => student.id === parseInt(id));
    if (!student) {
      res.status(404).send("Student not found");
    } else {
      const i = students.findIndex((s) => s.id === id);
      students[i] = updatedData;
      db.insertDbStudent(students).then((msg) => res.send(updatedData));
    }
  });
});

app.delete("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.getDbStudents().then((students) => {
    const student = students.find((student) => student.id === id);
    if (!student) {
      res.status(404).send("Student not found");
    }
    const updatedStudents = students.filter((s) => s.id !== id);
    db.insertDbStudent(updatedStudents).then((msg) => res.send(msg));
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
});
