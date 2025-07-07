require("dotenv").config();
const mongoose = require("mongoose");
const Student = require("./model/student"); // Assuming model is in ./model/Student.js
const students = require("./studennts").data;    // Assuming data is in ./data.js with key: data
console.log(Array.isArray(students), students.length);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Delete existing student documents
    await Student.deleteMany();
    console.log("🗑️  Existing student data deleted");

    // Basic validation
    students.forEach(student => {
      if (!student.name || !student.email || !student.rollno || !student.cgpa || !student.gender) {
        console.error("❌ Validation Error: Missing required fields:", student);
      }
    });

    // Insert new student data
    await Student.insertMany(students);
    console.log("✅ Students inserted successfully");

    mongoose.connection.close();
  })
  .catch(err => console.error("❌ MongoDB Connection Error:", err));
