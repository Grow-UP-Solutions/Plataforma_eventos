require('../../../DB.js');
const Conversation = require('../../db/Conversation.js');

async function findAllConversation() {
  try {
    return await Conversation.find();
  } catch (error) {
    return { ERROR_CONVERSATION: error.message };
  }
}
async function findConversation(userId) {
  try {
    return await Conversation.find({
      members: { $in: [userId] },
    });
  } catch (error) {
    return { ERROR_FINDCONVERSATION: error.message };
  }
}

async function createConversation(menbers) {
  const { senderId, receiverId } = menbers;

  try {
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });
    return await newConversation.save();
  } catch (error) {
    return { ERROR_CONVERSATION: error.message };
  }
}

module.exports = {
  findAllConversation,
  findConversation,
  createConversation,
};
