import { Schema, model } from "mongoose";

const opinionsOrganizerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  rating: {
    type: Number,
    default: 0,
  },
  opinion: String,
  organizer: String,
});
export default model("OpinionsOrganizer", opinionsOrganizerSchema);
