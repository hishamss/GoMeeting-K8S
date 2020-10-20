const db = require("../../models");

module.exports = {
  addGuest: async (args) => {
    try {
      var result = await db.Guests.create({
        email: args.guestInput.email,
        meeting: args.guestInput.meetingId,
      });
      try {
        let meetingResult = await db.Meetings.findOneAndUpdate(
          { _id: args.guestInput.meetingId },
          { $push: { guests: result } }
        );
        return {
          ...result._doc,
        };
      } catch (err) {
        console.log("////////////////////////////,", err);
        throw err;
      }
    } catch (err) {
      console.log("//////////////////////MongodDB: ", err);
      throw err;
    }
  },
  guests: async (args) => {
    try {
      let result = await db.Guests.find({ email: args.email }).populate(
        "meeting"
      );
      return result.map((row) => {
        return {
          ...row._doc,
        };
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  deleteGuest: async (args) => {
    try {
      let result = await db.Guests.deleteOne({
        email: args.email,
        meeting: args.meetingId,
      });
      console.log("deleteGuest", result);
      return {
        ...result,
      };
    } catch (err) {
      throw err;
    }
  },
};
