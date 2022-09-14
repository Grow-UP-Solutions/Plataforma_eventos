const { Schema, model } = require("mongoose");

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
});
module.exports = model("Opinions", OpinionsSchema);
