const UsersFunctionDb = require("./index.users");

module.exports=async function generateUserComment(id, opinions) {
    try {
       const { idUser, opinion, rating } = opinions;
 
       const user = await UsersFunctionDb.oneUser(idUser);
 
       const organizer = await UsersFunctionDb.oneUser(id);
       organizer.opinionsOrg.push({
          title: user.name,
          picture: user.picture,
          rating,
          opinion,
       });
       await organizer.save();
 
       return organizer.opinionsOrg[organizer.opinionsOrg.length - 1];
    } catch (error) {
       throw new Error(error.message);
    }
 }