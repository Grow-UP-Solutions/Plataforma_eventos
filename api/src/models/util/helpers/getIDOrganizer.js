const UsersFunctionDb = require('../functionDB/users/index.users');

const getIDOrganizer = async () => {
  const allUsers = await UsersFunctionDb.allUserDb();
  if (allUsers.length === 0) return 1;
  const id = allUsers[allUsers.length - 1].idOrganizer;
  const newId = +id.split('Z')[1] + 1;
  return newId;
};

module.exports = getIDOrganizer;
