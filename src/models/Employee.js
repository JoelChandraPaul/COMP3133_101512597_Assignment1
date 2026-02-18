const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    gender: { type: String, trim: true },
    designation: { type: String, required: true, trim: true },
    salary: {
      type: Number,
      required: true,
      min: [1000, "Salary must be at least 1000"],
    },
    date_of_joining: { type: Date, required: true },
    department: { type: String, required: true, trim: true },
    employee_photo: { type: String, trim: true }, // Cloudinary URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
