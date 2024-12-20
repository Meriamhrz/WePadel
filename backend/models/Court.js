const mongoose = require("mongoose");

const courtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  availability: { 
    type: [String], 
    default: [], 
    validate: {
      validator: function(arr) {
        return arr.every(time => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(time)); // Validate time format
      },
      message: "Invalid time format. Expected YYYY-MM-DDTHH:MM"
    }
  }
});

module.exports = mongoose.model("Court", courtSchema);
