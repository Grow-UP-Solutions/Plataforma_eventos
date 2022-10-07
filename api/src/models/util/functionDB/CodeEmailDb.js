import '../../../DB.js';
import CodeVerifyEmail from '../../db/CodeEmail.js';

/** basic user database operations */

/**Creating Category in Database */
export async function createCodeVerifyMail(code) {
  try {
    const codeCreated = new CodeVerifyEmail({ code });
    return await codeCreated.save();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCodeVerifyMail(id) {
  try {
    return await CodeVerifyEmail.findByIdAndDelete({ _id: id }).lean();
  } catch (error) {
    console.log(error);
  }
}

export async function getCodeVerifyEmail(code) {
  try {
    return await CodeVerifyEmail.findOne({ code }).lean();
  } catch (error) {
    console.log(error);
  }
}
