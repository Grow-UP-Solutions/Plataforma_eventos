const { Schema, model } = require('mongoose');

const conversationSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = model('Conversation', conversationSchema);
