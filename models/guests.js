const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  meeting: {
    type: Schema.Types.ObjectId,
    ref: "meetings",
  },
});
// Export the model to app.js
module.exports = mongoose.model("guests", guestSchema);
