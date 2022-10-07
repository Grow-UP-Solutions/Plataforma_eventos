import {
  createCodeVerifyMail,
  deleteCodeVerifyMail,
} from '../../models/util/functionDB/CodeVerifyMailDb.js';

export async function createCode(id) {
  try {
    const code = createCodeVerifyMail(id);
    if (!code) {
      throw new Error(`El usuario no fue encontrado`);
    }
    return code;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteCode(id) {
  try {
    const code = await deleteCodeVerifyMail(id);
    if (!code) {
      throw new Error(`El usuario no fue encontrado`);
    }
    return code;
  } catch (error) {
    throw new Error(error.message);
  }
}
