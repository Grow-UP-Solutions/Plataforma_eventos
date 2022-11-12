const UsersFunctionDb = require("./index.users");

module.exports=async function findAllUpdateNotification(id) {
    try {
       const user = await UsersFunctionDb.oneUser(id);
 
       user.notifications.forEach(async (e) => {
          e.read = true;
       });

       await user.save();
       return user.notifications;
       
    } catch (error) {
       throw new Error(error.message);
    }
 }