const meetingsResolver = require("./meetings");
const guestsResolver = require("./guests");

module.exports = {
  ...meetingsResolver,
  ...guestsResolver,
};
