const mongoose = require("mongoose");
 
const coachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Ranking: { type: String, required: true }, // Ensure uppercase R is consistent
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  availability: {
    type: [String],
    default: [],
    
    validate: {
      validator: function (arr) {
        return arr.every((time) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(time));
      },
      message: "Invalid time format. Expected YYYY-MM-DDTHH:MM",
    },
  },
});
 
module.exports = mongoose.model("Coach", coachSchema);