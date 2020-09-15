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
      console.log("MongodDB: ", err);
      throw err;
    }
  },
};
