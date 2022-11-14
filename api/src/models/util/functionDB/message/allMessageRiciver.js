const UsersFunctionDb = require('../users/index.users');

module.exports = async function allMessageReciverUserDB(idReciver) {
  let messageUser = await UsersFunctionDb.oneUser(idReciver);
  return messageUser.message;
};
