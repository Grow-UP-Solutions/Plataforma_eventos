require("../../../DB.js");
const Conversation = require("../../db/Conversation.js");
const Message = require("../../db/Message.js");

async function allMessageDB() {
  return await Message.find()
  
}


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
async function findAllMessageUser(conversationId) {
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
async function allMessageReciverUserDB(idReciver) {
  let messageUser = [];
  const allConversation = await Conversation.find({});
  const allMessage = await allMessageDB();
  const conversationUser = allConversation.filter(
     (e) => e.members[1] === idReciver
  );

  for (let i = 0; i <= conversationUser.length - 1; i++) {
     for (let j = 0; j < allMessage.length; j++) {
        if (allMessage[j].conversationId == conversationUser[i]._id) {
           messageUser.push(allMessage[j]);
        }
     }
  }
  return messageUser;
}

module.exports = {
  allMessageReciverUserDB,
  allMessageDB,
  createMessage,
  findMessage,
  findOneMessage,
  findAndUpdateMessage,
};
