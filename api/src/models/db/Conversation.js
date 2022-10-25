const { Schema, model } = require("mongoose");

const conversationSchema = new Schema(
   {
      members: {
         type: Array,
      },
      locked: {
         type: Boolean,
         default: false,
      },
   },

   { timestamps: true }
);

module.exports = model("Conversation", conversationSchema);
