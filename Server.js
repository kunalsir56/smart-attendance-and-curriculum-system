const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ----------------------
// Dummy Database (for prototype)
// ----------------------
let students = [
  { id: 1, name: "Student A", present: false },
  { id: 2, name: "Student B", present: false }
];

let attendanceLog = [];

// ----------------------
// API ROUTES
// ----------------------

// Fetch students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// Mark attendance via Face Recognition
app.post("/api/attendance/face", (req, res) => {
  const { studentId } = req.body;

  const student = students.find(s => s.id === studentId);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.present = true;
  attendanceLog.push({
    studentId,
    method: "FACE",
    time: new Date()
  });

  res.json({ message: "Attendance marked via Face Recognition" });
});

// Mark attendance via QR Code
app.post("/api/attendance/qr", (req, res) => {
  const { studentId } = req.body;

  const student = students.find(s => s.id === studentId);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.present = true;
  attendanceLog.push({
    studentId,
    method: "QR",
    time: new Date()
  });

  res.json({ message: "Attendance marked via QR Code" });
});

// Get attendance records (Teacher Dashboard)
app.get("/api/attendance", (req, res) => {
  res.json(attendanceLog);
});

// ----------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
