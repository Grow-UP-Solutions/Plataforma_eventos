const {
  findAndUpdateMessage,
  findMessage,
  findOneMessage,
} = require("../../models/util/functionDB/messageDb.js");

async function updateMessage(id, read) {
  try {
    const message = await findOneMessage(id);

    if (!message) {
      throw new Error("el mensaje no existe");
    }
    const newMessage = await findAndUpdateMessage(id, read);
    return newMessage;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports={
  updateMessage
}
