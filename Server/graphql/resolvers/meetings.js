const db = require("../../models");

module.exports = {
  createMeeting: async (args) => {
    try {
      var result = await db.Meetings.create({
        name: args.meetingInput.name,
        host: args.meetingInput.host,
        date: args.meetingInput.date,
      });

      return { ...result._doc };
    } catch (err) {
      console.log("//////////////////////MongodDB: ", err);
      throw err;
    }
  },
  deleteMeeting: async (args) => {
    try {
      let result = await db.Meetings.deleteOne({
        _id: args.meetingId,
      });
      console.log("deleteMeeting", result);
      if (result["deletedCount"] === 1) {
        try {
          let guestResult = await db.Guests.deleteMany({
            meeting: args.meetingId,
          });
          console.log("deleteGuests", guestResult);
        } catch (err) {
          throw err;
        }
      }
      return {
        ...result,
      };
    } catch (err) {
      throw err;
    }
  },
  meetings: async () => {
    try {
      let result = await db.Meetings.find().populate("guests");
      return result.map((row) => {
        return {
          ...row._doc,
        };
      });
    } catch (err) {
      throw err;
    }
  },
};
