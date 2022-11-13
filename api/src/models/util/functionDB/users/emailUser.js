const Users = require('../../../db/Users');

module.exports = async function validateEmailUserDb(email) {
  try {
    return await Users.findOne({ email: email });
  } catch (error) {
    throw new Error(error.message);
  }
};
