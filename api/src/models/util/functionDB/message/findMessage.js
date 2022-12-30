const Message = require('../../../db/Message');

module.exports = async function findMessage(conversationId) {
  try {
    return await Message.find({
      conversationId: conversationId,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
