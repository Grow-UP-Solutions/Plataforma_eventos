const {
  findAndUpdateMessage,
  findMessage,
  //findOneMessage,
} = require("../../models/util/functionDB/message/messageDb.js");

async function updateMessage(id, conversationId) {
  try {
    console.log(conversationId)
    const message = await findMessage(id);
    
    if (!message) {
      throw new Error("No existe mensaje en esta conversacion");
    }
    const newMessage = await findAndUpdateMessage(id, conversationId);
    return newMessage;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports={
  updateMessage
}
