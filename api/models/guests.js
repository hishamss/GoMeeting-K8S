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
// unique compund index to make sure email and meetingID combination is unique
guestSchema.index({ email: 1, meeting: 1 }, { unique: true });
// Export the model to app.js
module.exports = mongoose.model("guests", guestSchema);
