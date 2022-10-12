require('../../../DB.js');
const Conversation = require('../../db/Conversation.js');

async function findAllConversation() {
  try {
    return await Conversation.find();
  } catch (error) {
    throw new Error(error.message);
  }
}
async function findConversation(userId) {
  try {
    return await Conversation.find({
      members: { $in: [userId] },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createConversation(menbers) {
  const { senderId, receiverId } = menbers;
  try {
    const conversation = await Conversation.findOne({
      senderId:senderId,
      receiverId:receiverId
    })
    if (!conversation) {
       const newConversation = new Conversation({
      members: [senderId, receiverId],
    });
    return await newConversation.save();
    }
    return conversation
   
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  findAllConversation,
  findConversation,
  createConversation,
};
