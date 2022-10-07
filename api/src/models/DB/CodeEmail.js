import { Schema, model } from 'mongoose';

const CodeVerifyEmailSchema = new Schema({
  code: String,
});

export default model('CodeVerifyEmail', CodeVerifyEmailSchema);
