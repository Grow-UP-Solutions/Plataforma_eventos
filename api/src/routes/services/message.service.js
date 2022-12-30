const MessageFunctionDb = require('../../models/util/functionDB/message/index.message.js');

async function updateMessage(id, conversationId) {
  try {
    const message = await MessageFunctionDb.findMessage(id);

    console.log({ message });

    if (!message) {
      throw new Error('No existe mensaje en esta conversacion');
    }
    const newMessage = await MessageFunctionDb.updateAll(id, conversationId);
    return newMessage;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  updateMessage,
};
