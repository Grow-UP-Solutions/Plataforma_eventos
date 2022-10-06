import { Schema, model } from "mongoose";

const conversationSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default model("Conversation", conversationSchema);
