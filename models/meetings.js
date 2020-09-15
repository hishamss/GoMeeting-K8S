const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  host: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  guests: [
    {
      type: Schema.Types.ObjectId,
      ref: "guest",
    },
  ],
});
// Export the model to app.js
module.exports = mongoose.model("meeting", eventSchema);
