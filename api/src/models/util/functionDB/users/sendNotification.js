const Users = require('../../../db/Users');

module.exports = async function sendNotificationDB(id, msg) {
  try {
    const user = await Users.findOne({ _id: id });
    console.log({ user });
    user.notifications.push({ msg });
    await user.save();
    return user.notifications[user.notifications.length - 1];
  } catch (error) {
    throw new Error(error.message);
  }
};
