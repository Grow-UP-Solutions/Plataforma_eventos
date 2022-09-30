import { Schema, model } from "mongoose";

const EventSchema = new Schema({
  title: String,
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  otherCategorie: [String],
  shortDescription: String,
  longDescription: String,
  pictures: [String],
  online: String,
  link: String,
  departamento: String,
  municipio: String,
  direccion: String,
  barrio: String,
  
  specialRequires: String,
  cupos: Number,
  price: String,
  dates: [
    {
      date: String,
      start: String,
      end: String,
    },
  ],

  isPublic: {
    type: Boolean,
    default: false,
  },

  rating: {
    type: Number,
    default: 0,
  },

 
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },

  opinions: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
      title: String,
      email: String,
      time: {
        type: Date,
        default: Date.now(),
      },
      rating: Number,
      opinion: String,
      picture: {
        type: String,
        default: null,
      },
    },
  ],
});

export default model("Events", EventSchema);
