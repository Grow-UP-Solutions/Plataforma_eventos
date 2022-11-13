const MessageFunctionDb = require("./index.message");

module.exports = async function findAndUpdateMessage(idUser, conversationId) {
    try {
       const userAndMessage = await MessageFunctionDb.allMessageReciver(idUser);
       const messageConversation = userAndMessage.filter((e) => {
          return e.conversationId === conversationId;
       });
 
       messageConversation.forEach(async (e) => {
          e.read = true;
          await e.save();
       });
 
       return messageConversation;
    } catch (error) {
       throw new Error(error.message);
    }
 }