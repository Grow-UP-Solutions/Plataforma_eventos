require('../../../DB.js');
const Verificacion = require('../../db/Verificacion');

/** basic user database operations */

/**Creating Category in Database */
async function createCodeVerifyMail(code) {
  const codeCreated = new Verificacion({ validacion: code });
  return await codeCreated.save();
}

async function deleteCodeVerifyMail(code) {
  return await Verificacion.findOneAndDelete({ validacion: code }).lean();
}

async function getCodeVerifyEmail(code) {
  return await Verificacion.findOne({ validacion: code }).lean();
}

module.exports = {
  createCodeVerifyMail,
  deleteCodeVerifyMail,
  getCodeVerifyEmail,
};
