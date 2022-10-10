import { Schema, model } from 'mongoose';

const VerifySchema = new Schema({
  code: String,
});

export default model('Verify', VerifySchema);
