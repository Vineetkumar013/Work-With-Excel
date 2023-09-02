const mongoose = require("mongoose");

const ExcelSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: String,
  mobile: Number,
  salary: String,
  dob: String,
  company: String,
  country: String,
  pinCode: String,
},{timestamps:true});

module.exports = mongoose.model("Exceldata", ExcelSchema);
