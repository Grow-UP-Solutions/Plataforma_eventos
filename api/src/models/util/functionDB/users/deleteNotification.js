const Users = require('../../../db/Users');

module.exports = async function deleteNotificationDB(newDelete) {
  try {
    const { idNotifications, delet } = newDelete;
    const user = await Users.findOne({
      notifications: { $elemMatch: { _id: idNotifications } },
    });
    const notificationsDelete = user.notifications.find((e) => e._id == idNotifications);
    notificationsDelete.delete = delet;

    await user.save();
    return user.notifications;
  } catch (error) {
    console.log('error', error.message);
    throw new Error(error.message);
  }
};
