const Message = require("../../../db/Message");
const outstanding = require("./oustanding");

module.exports = async function outstandingMessage(idMessage, idUser) {
   try {
      const messageOutstanding = await Message.findOne({ _id: idMessage });

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
         text: messageOutstanding.text,
      });
      await messageOutstanding.save();
      return { msg: "mensaje destacado", messageOutstanding };
   } catch (error) {
      throw new Error(error.message);
   }
};
