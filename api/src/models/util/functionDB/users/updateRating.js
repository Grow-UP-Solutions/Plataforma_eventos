const UsersFunctionDb = require("./index.users");

module.exports=async function updateUserRating(idUser, rating) {
    try {
       const ratinUser = await UsersFunctionDb.oneUser(idUser);
       if (ratinUser) {
          ratinUser.rating = rating;
          return await ratinUser.save();
       }
       return { msg: "Evento no encontrado" };
    } catch (error) {
       throw new Error(error.message);
    }
 }