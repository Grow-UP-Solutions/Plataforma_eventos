require("../../../DB.js");
const Conversation = require("../../db/Conversation.js");

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
         members: [senderId, receiverId],
      });

      if (!conversation) {
         const newConversation = new Conversation({
            members: [senderId, receiverId],
         });
         return await newConversation.save();
      }

      return conversation;
   } catch (error) {
      throw new Error(error.message);
   }
}

async function lockedConversation(idConversation) {
   try {
      const conversation = await Conversation.findById({ _id: idConversation });
      if (conversation) {
         conversation.locked = !conversation.locked;
         await conversation.save()
         return { msg: "conversacion bloqueda", conversation };
      }
      return {msg : 'La conversacion no existe'}
   } catch (error) {
      throw new Error(error.message);
   }
}

module.exports = {
   findAllConversation,
   findConversation,
   createConversation,
   lockedConversation,
};
