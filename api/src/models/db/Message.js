const { Schema, model } = require('mongoose');

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
    mensajeRecibido:[{
      type:Schema.Types.ObjectId,
      ref:'message'
    }],
    read: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model('Message', messageSchema);
