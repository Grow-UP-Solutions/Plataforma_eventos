const Users = require("../../../db/Users");

module.exports= async function updateNotificationDB(reading) {
    try {
       const { idNotifications, read } = reading;
       const user = await Users.findOne({
          notifications: { $elemMatch: { _id: idNotifications } },
       });
       const newRead = user.notifications.find((e) => e._id == idNotifications);
       newRead.read = read;
 
       await user.save();
       return user.notifications;
    } catch (error) {
       console.log("error", error.message);
       throw new Error(error.message);
    }
 }

 