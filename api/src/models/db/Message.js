const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
   {
      conversationId: {
         type: String,
      },
      sender: {
         type: String,
      },
      text: {
         type: String,
      },

      read: {
         type: Boolean,
         default: false,
      },
      delete: {
         type: Boolean,
         default: false,
      },
      outstanding: [
         {
            messageOutstanding: {
               type: String,
            },
            idUser: String,
            isOutstanding: {
               type: Boolean,
               default: true,
            },
            text: {
               type: String,
               default: "",
            },
         },
      ],
   },
   { timestamps: true }
);

module.exports = model("Message", messageSchema);
