require("../../../../DB");
const Users = require("../../../db/Users");


module.exports = async function findAndUpdateMessage(idUser, conversationId) {
   try {
      const userAndMessage = await Users.findOne({ _id: idUser }).populate(
         "message"
      );

     
      const messageConversation = userAndMessage.message.filter((e) => {
         return e.conversationId == conversationId;
      });

      messageConversation.forEach(async (e) => {
         e.read = true;
         await e.save();
      });

      return messageConversation;
   } catch (error) {
      throw new Error(error.message);
   }
};
