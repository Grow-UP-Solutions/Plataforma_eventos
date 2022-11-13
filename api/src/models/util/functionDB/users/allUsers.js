const Users = require('../../../db/Users');

module.exports = async function allUserDb() {
  try {
    return await Users.find()
      .populate({ path: 'myEventsCreated' })
      .populate({ path: 'myFavorites' })
      .populate({ path: 'myEventsBooked' })
      .populate({ path: 'message' });
  } catch (error) {
    throw new Error(error.message);
  }
};
