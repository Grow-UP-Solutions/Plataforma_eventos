import  { Schema, model } from "mongoose";

const OpinionsSchema = new Schema({
  title:String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  email:String,
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

export default model("OpinionsEven", OpinionsSchema);

