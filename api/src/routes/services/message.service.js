const {
  findAndUpdateMessage,
  findMessage,
  //findOneMessage,
} = require("../../models/util/functionDB/messageDb.js");

async function updateMessage(id) {
  try {
    const message = await findMessage(id);
    
    if (!message) {
      throw new Error("No existe mensaje en esta conversacion");
    }
    const newMessage = await findAndUpdateMessage(id);
    return newMessage;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports={
  updateMessage
}
