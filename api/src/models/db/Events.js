import { Schema, model } from "mongoose";

const EventSchema = new Schema({
  name: String,
  nick: String,
  description: String,
  
  dates: [
    {
      date: String,
      cupos: Number,
      start: String,
      end:String
    }    
  ],
  
  price: String,
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
      type: Schema.Types.ObjectId,
      ref: "Opinions",
    },
  ],
});

export default model("Events", EventSchema);
