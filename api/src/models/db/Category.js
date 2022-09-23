import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  name: String,
  img: String,
  description: String,
});

export default model("Category", CategorySchema);


