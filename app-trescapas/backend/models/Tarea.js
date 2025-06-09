const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  assignee: { type: String },
  dueDate: { type: String },
  completed: { type: Boolean, default: false },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Tarea", tareaSchema);
