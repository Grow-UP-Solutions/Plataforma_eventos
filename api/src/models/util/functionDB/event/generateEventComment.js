const Events = require("../../../db/Events");
const UsersFunctionDb = require("../users/index.users");

module.exports=async function generateEventComment(id, opinions) {
    try {
       const { opinion, idUser, rating } = opinions;
 
       const user = await UsersFunctionDb.oneUser(idUser);
       const event = await Events.findOne({ _id: id });
 
       event.opinions.push({
          title: user.name,
          opinion,
          picture: user.picture,
          user: user._id,
          rating,
       });
       
       await event.save();
 
       return event.opinions[event.opinions.length - 1];
    } catch (error) {
       throw new Error(error.message);
    }
 }