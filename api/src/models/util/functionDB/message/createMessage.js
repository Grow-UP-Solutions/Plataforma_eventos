const Message = require("../../../db/Message");
const UsersFunctionDb = require("../users/index.users");

module.exports=async function createMessage(message) {
    const { resiver } = message;
    try {

       const user = await UsersFunctionDb.oneUser(resiver);
 
       const newMessage = new Message(message);
       
       await newMessage.save();
 
       user.message.push(newMessage._id);
 
       await user.save();

       return newMessage;

    } catch (error) {
       console.log(error.message);
       throw new Error(error.message);
    }
 }