require("../../../DB.js");
const Conversation = require("../../db/Conversation.js");
const Message = require("../../db/Message.js");
const { oneUserDb } = require("./UserDb.js");

async function allMessageDB() {
   return await Message.find();
}

async function createMessage(message) {
   const { resiver } = message;
   try {
      const user = await oneUserDb(resiver);

      const newMessage = new Message(message);
      await newMessage.save();
      if (user._id != newMessage.sender) {
         user.message.push(newMessage._id);
      }

      user.save();
      return newMessage;
   } catch (error) {
      console.log(error.message);
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

async function findOneMessage(idMessage) {
   return await Message.findOne({ _id: idMessage });
}

async function findAndUpdateMessage(idUser, conversationId) {
   try {
      const userAndMessage = await allMessageReciverUserDB(idUser);
      const messageConversation = userAndMessage.filter((e) => {
         return e.conversationId == conversationId;
      });

      messageConversation.forEach(async (e) => {
         e.read = true;
         await e.save();
      });

      return userAndMessage;
   } catch (error) {
      throw new Error(error.message);
   }
}
async function allMessageReciverUserDB(idReciver) {
   let messageUser = await oneUserDb(idReciver);
   return messageUser.message;
}

async function outstandingMessage(idMessage) {
   try {
      const messageOutstanding = await findOneMessage(idMessage);
      if (messageOutstanding) {
         messageOutstanding.outstanding = !messageOutstanding.outstanding;
         await messageOutstanding.save();
         return { msg: "mensaje destacado", messageOutstanding };
      }
      return { msg: "no se encontro el mensaje" };
   } catch (error) {
      throw new Error(error.message);
   }
}

module.exports = {
   allMessageReciverUserDB,
   allMessageDB,
   createMessage,
   findMessage,
   findOneMessage,
   findAndUpdateMessage,
   outstandingMessage,
};
