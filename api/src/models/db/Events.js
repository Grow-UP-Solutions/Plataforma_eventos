const { Schema, model } = require("mongoose");

const EventSchema = new Schema({
  name: String,
  nick: String,
  description: String,
  date: [String],
  dates: [
    {
      date: String,
      cupos: Number,
      time: String,
      price: String,
      year: Number,
    }
    
  ],
 
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

module.exports = model("Events", EventSchema);
