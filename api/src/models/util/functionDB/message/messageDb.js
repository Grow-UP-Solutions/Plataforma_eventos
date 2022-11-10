require("../../../../DB.js");
const Conversation = require("../../../db/Conversation.js");
const Message = require("../../../db/Message.js");
const { oneUserDb } = require("../UserDb.js");
const outstanding = require("./oustanding.js");

async function allMessageDB() {
   return await Message.find();
}

async function createMessage(message) {
   const { resiver } = message;
   try {
      const user = await oneUserDb(resiver);

      const newMessage = new Message(message);
      await newMessage.save();

      user.message.push(newMessage._id);

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

async function findAndUpdateMessage(idUser, conversationId) {
   try {
      const userAndMessage = await allMessageReciverUserDB(idUser);
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
}

async function findOneMessage(idMessage) {
   return await Message.findOne({ _id: idMessage });
}

async function allMessageReciverUserDB(idReciver) {
   let messageUser = await oneUserDb(idReciver);
   return messageUser.message;
}

async function outstandingMessage(idMessage, idUser) {
   try {
      const messageOutstanding = await findOneMessage(idMessage);

      if (messageOutstanding.outstanding.length > 0) {
         const userExiste = messageOutstanding.outstanding.find(
            (e) => e.idUser === idUser
         );
         userExiste
            ? outstanding(idUser, messageOutstanding.outstanding)
            : messageOutstanding.outstanding?.push({
                 messageOutstanding: messageOutstanding._id,
                 idUser,
              });
         (await messageOutstanding.save()).populate({ path: "outstanding" });
         return messageOutstanding;
      }

      messageOutstanding.outstanding?.push({
         messageOutstanding: messageOutstanding._id,
         idUser,
         text: messageOutstanding.text
      });
      await messageOutstanding.save();
      return { msg: "mensaje destacado", messageOutstanding };
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
