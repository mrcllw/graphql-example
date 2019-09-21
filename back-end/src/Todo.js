const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  text: String,
}, {
  timestamps: true
});

module.exports = mongoose.model("Todo", TodoSchema);
