import { Schema, model } from 'mongoose';

const CodeVerifySchema = new Schema({
  code: String,
});

export const CodeVerify = model('CodeVerify', CodeVerifySchema);
