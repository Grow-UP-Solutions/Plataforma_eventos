import '../../../DB.js';
import CodeVerifyEmail from '../../db/CodeVerifyEmail.js';

/** basic user database operations */

/**Creating Category in Database */
export async function createCodeVerifyMail(code) {
  const codeCreated = new CodeVerifyEmail({ code });
  return await codeCreated.save();
}

export async function deleteCodeVerifyMail(id) {
  return await CodeVerifyEmail.findByIdAndDelete({ _id: id }).lean();
}

export async function getCodeVerifyEmail(code) {
  return await CodeVerifyEmail.findOne({ code }).lean();
}
