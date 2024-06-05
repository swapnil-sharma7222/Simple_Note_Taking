const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  note: {
    type: String,
    required: [true, "please add a note"],
  },
  color: {
    type: String,
  }
} 
);

module.exports = mongoose.model("Notes", noteSchema);