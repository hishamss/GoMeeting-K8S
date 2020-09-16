const db = require("../../models");

module.exports = {
  addGuest: async (args) => {
    try {
      var result = await db.Guests.create({
        email: args.guestInput.email,
        meeting: "5f616aef531cf84148c8888f",
      });
      try {
        let meetingResult = await db.Meetings.findOneAndUpdate(
          { _id: "5f616aef531cf84148c8888f" },
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
  guests: async () => {
    try {
      let result = await db.Guests.find().populate("meeting");
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
};
