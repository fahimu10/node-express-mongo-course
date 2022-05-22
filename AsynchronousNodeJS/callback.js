// Callback function & setTimeout function

console.log("Line 1");

getStudent(1, showStudent);

console.log("Line 2");

function showStudent(student) {
  console.log(student);
  getCourses(student, showCourses);
}
function showCourses(courses) {
  console.log(courses);
  getQuizMarks(courses.courses, showMarks);
}
function showMarks(marks) {
  console.log(marks);
}

function getStudent(id, callback) {
  setTimeout(() => {
    console.log("Fetching.....");
    callback({ id: id, name: "John" });
  }, 2000);
}

function getCourses(student, callback) {
  setTimeout(() => {
    console.log("Fetching course.....");
    callback({ id: student.id, name: student.name, courses: ["JS", "Python"] });
  }, 1500);
}

function getQuizMarks(course, callback) {
  setTimeout(() => {
    console.log("Fetching quiz marks.....");
    callback({ [course[0]]: 5, [course[1]]: 4 });
  }, 2000);
}
