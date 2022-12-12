const Users = require('../../../db/Users');

module.exports = async function codeUser(code) {
  return await Users.findOne({ referralCode: code });
};
