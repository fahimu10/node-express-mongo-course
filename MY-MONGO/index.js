const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/my-students")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, "First name is required"] },
  lastName: { type: String, required: [true, "Last name is required"] },
  email: { type: String, required: [true, "Email is required"] },
  age: Number,
  dob: {
    type: Date,
    validate: {
      validator: (value) => value > new Date("1 January 1998"),
      message: "Date of birth must be greater than 1 January 1998",
    },
  },
  entryDate: { type: Date, default: Date.now },
  hobbies: {
    type: Array,
    of: String,
    validate: {
      validator: (value) => value.length > 0,
      message: "At least one hobby is required",
    },
  },
  parents: {
    father: String,
    mother: String,
  },
  subject: [{ name: String, marks: { type: Number, min: 0, max: 100 } }],
});

const Student = mongoose.model("Student", studentSchema);

async function createStudent() {
  try {
    const result = await Student.create({
      firstName: "Fahim",
      lastName: "Uddin",
      email: "fahimuddin900@gmail.com",
      age: 20,
      dob: new Date("10 May 1998"),
      hobbies: ["Cricket", "Football", "Reading"],
      parents: {
        father: "Md. Farid Uddin",
        mother: "Rashida Akter",
      },
      subject: [
        {
          name: "Math",
          marks: 90,
        },
        {
          name: "English",
          marks: 80,
        },
      ],
    });
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}

async function readStudents() {
  try {
    const data = await Student.find().select({
      firstName: 1,
      lastName: 1,
    });
    console.log(data);
  } catch (err) {
    console.log(err._message);
  }
}

async function updateStudent(id) {
  try {
    const data = await Student.updateOne({ _id: id }, { $set: { age: 21 } });
    console.log(data);
  } catch (err) {
    for (field in err.errors) {
      console.log(err.errors[field].message);
    }
  }
}

async function deleteStudent(id) {
  try {
    const data = Student.deleteOne({ _id: id });
    console.log(data);
  } catch (err) {
    console.log(err._message);
  }
}
// createStudent();
// readStudents();
// updateStudent("62ceb18cd4d2bac1533bf3b1");
// deleteStudent("62ceb18cd4d2bac1533bf3b1");
