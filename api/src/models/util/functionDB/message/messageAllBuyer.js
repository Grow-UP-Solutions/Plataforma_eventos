const Message = require("../../../db/Message");
const UsersFunctionDb = require("../users/index.users");

module.exports = async function messageAllBuyer(message) {
   const { resiver } = message;

   try {
      const userTemp = resiver.map(async (e) => {
         return await UsersFunctionDb.oneUser(e);
      });

      const user = await Promise.all(userTemp);

      const newMessage = new Message(message);

      for (let i = 0; i <= user.length - 1; i++) {
         for (let j = 0; j <= resiver.length; j++) {
            if (user[i]?._id == resiver[j]) {
               user[i].message.push(newMessage._id);
               await user.save();
            }
         }
      }

      await newMessage.save();

      return newMessage;
   } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
   }
};
