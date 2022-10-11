require('../../../DB.js');
const Validacion = require('../../db/Verificacion.js');

/** basic user database operations */

/**Creating Category in Database */
async function createCodeVerifyMail(code) {
  const codeCreated = new Validacion({ code });
  return await codeCreated.save();
}

async function deleteCodeVerifyMail(id) {
  return await Validacion.findByIdAndDelete({ _id: id }).lean();
}

async function getCodeVerifyEmail(code) {
  return await Validacion.findOne({ code }).lean();
}

module.exports = {
  createCodeVerifyMail,
  deleteCodeVerifyMail,
  getCodeVerifyEmail,
};
