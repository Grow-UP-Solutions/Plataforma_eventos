require('../../../DB.js');
const Message = require('../../db/Message.js');

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

async function findAndUpdateMessage(id, read) {
  try {
    const newMessage = await findOneMessage(id);
    newMessage.read = read;
    return await newMessage.save();
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
