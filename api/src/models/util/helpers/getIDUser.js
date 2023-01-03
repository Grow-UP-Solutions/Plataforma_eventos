const UsersFunctionDb = require('../functionDB/users/index.users');

const getIDUser = async () => {
  const allUsers = await UsersFunctionDb.allUserDb();
  if (allUsers.length === 0) return 1;
  const id = allUsers[allUsers.length - 1].idUser;
  const newId = +id.split('U')[1] + 1;
  return newId;
};

module.exports = getIDUser;
