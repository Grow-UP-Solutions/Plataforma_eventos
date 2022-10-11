import { Schema, model } from "mongoose";

const VerifySchema = new Schema({
  validate: {
    type:String
  }
});

export default model("Verify", VerifySchema);
