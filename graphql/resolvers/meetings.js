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

  meetingsPerUser: async (args) => {
    try {
      let result = await db.Meetings.find({ host: args.host }).populate(
        "guests"
      );
      return result.map((row) => {
        return { ...row._doc };
      });
    } catch (err) {
      throw err;
    }
  },
};
