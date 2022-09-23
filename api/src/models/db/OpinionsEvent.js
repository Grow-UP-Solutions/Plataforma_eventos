import { Schema, model } from "mongoose";

const OpinionsSchema = new Schema({
  title:String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  rating: Number,
  opinion: String,
  picture: String,
  event:{
    type:Schema.Types.ObjectId,
    ref:"Events"
  }

});
export default model("OpinionsEvente", OpinionsSchema);

