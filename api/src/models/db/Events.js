import { Schema, model } from "mongoose";
import OpinionsEvent from "./OpinionsEvent.js";

const EventSchema = new Schema({
  name: String,
  nick: String,
  description: String,
  dates: [
    {
      date: String,
      start: String,
      end: String,
    },
  ],
  cupos: Number,
  price: String,
  state:String,
  city:String,
  year: Number,
  rating: Number,
  enLinea: Boolean,
  pictures: [String],
  participants: Number,
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  opinions: [
    {
      user:String,
      title: String,
      email: String,
      time: {
        type: Date,
        default: Date.now(),
      },
      rating: Number,
      opinion: String,
      picture: String,
    },
  ],
});

export default model("Events", EventSchema);
