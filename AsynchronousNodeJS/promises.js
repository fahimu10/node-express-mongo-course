// Promise & setTimeout function

console.log("Line 1");

// Promises using then()
// const p = getStudent(1);
// p.then((student) => {
//   console.log(student);
//   return getCourses(student);
// })
//   .then((courses) => {
//     console.log(courses);
//     return getQuizMarks(courses.courses);
//   })
//   .then((marks) => {
//     console.log(marks);
//   });

// Assync & await
async function studentData() {
  const student = await getStudent(1);
  console.log(student);
  const courses = await getCourses(student);
  console.log(courses);
  const marks = await getQuizMarks(courses.courses);
  console.log(marks);
}
studentData();

console.log("Line 2");

function getStudent(id, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetching.....");
      resolve({ id: id, name: "John" });
    }, 2000);
  });
}

function getCourses(student, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetching course.....");
      resolve({
        id: student.id,
        name: student.name,
        courses: ["JS", "Python"],
      });
    }, 1500);
  });
}

function getQuizMarks(course, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetching quiz marks.....");
      resolve({ [course[0]]: 5, [course[1]]: 4 });
    }, 2000);
  });
}
