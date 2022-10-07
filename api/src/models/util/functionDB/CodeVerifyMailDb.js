import '../../../DB.js';
import CodeVerifyMail from '../../db/CodeVerifyMail.js';

/** basic user database operations */

/**Creating Category in Database */
export async function createCodeVerifyMail(code) {
  const codeCreated = new CodeVerifyMail({ code });
  return await codeCreated.save();
}

export async function deleteCodeVerifyMail(id) {
  return await CodeVerifyMail.findByIdAndDelete({ _id: id }).lean();
}

export async function getCodeVerifyEmail(code) {
  return await CodeVerifyMail.findOne({ code }).lean();
}
