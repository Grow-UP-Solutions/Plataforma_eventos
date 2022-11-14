const UsersFunctionDb = require('../users/index.users');

module.exports = async function findAndUpdateMessage(idUser, conversationId) {
  try {
    const user = await UsersFunctionDb.oneUser(idUser);
    const userAndMessage = user.message;
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
};
