const Users = require('../../../db/Users');

module.exports = async function findAllUpdateNotification(id) {
  try {
    const user = await Users.findById(id);

    user.notifications.forEach(async (e) => {
      e.read = true;
    });

    await user.save();
    return user.notifications;
  } catch (error) {
    throw new Error(error.message);
  }
};
