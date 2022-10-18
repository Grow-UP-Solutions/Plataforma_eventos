require("../../../DB.js");
const Message = require("../../db/Message.js");

async function createMessage(message) {
  const newMessage = new Message(message);

  try {
    return await newMessage.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findMessage(conversationId) {
  try {
    return await Message.find({
      conversationId: conversationId,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
async function findOneMessage(id) {
  return await Message.findOne({ _id: id });
}

async function findAndUpdateMessage(id) {
  try {
    const newMessage = await findMessage(id);
    newMessage.forEach(async (e) => {
      e.read = true
      await e.save()
   });

    return newMessage;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createMessage,
  findMessage,
  findOneMessage,
  findAndUpdateMessage,
};
