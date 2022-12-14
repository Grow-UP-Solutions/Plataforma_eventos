const Users = require('../../../db/Users');

module.exports = async function sendNotificationDB(id, msg, date) {
  try {
    const user = await Users.findOne({ _id: id });
    user.notifications.push({ msg, date });
    await user.save();
    return user.notifications[user.notifications.length - 1];
  } catch (error) {
    throw new Error(error.message);
  }
};
