const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  meeting: {
    type: Schema.Types.ObjectId,
    ref: "meeting",
  },
});
// Export the model to app.js
module.exports = mongoose.model("guest", eventSchema);
