import { Schema, model } from 'mongoose';

const CodeVerifySchema = new Schema({
  code: String,
});

export default model('CodeVerify', CodeVerifySchema);
