import { Schema, model } from 'mongoose';

const CodeSchema = new Schema({
  code: String,
});

export default model('Code', CodeSchema);
