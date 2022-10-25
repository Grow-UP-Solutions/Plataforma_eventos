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
      user.message.push(newMessage._id);
      
      user.save()
      return newMessage;
   } catch (error) {
    console.log(error.message)
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
      const userAndMessage = await allMessageReciverUserDB(id);
      
      userAndMessage.forEach(async (e) => {
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

module.exports = {
   allMessageReciverUserDB,
   allMessageDB,
   createMessage,
   findMessage,
   findOneMessage,
   findAndUpdateMessage,
};
