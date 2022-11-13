const Users = require('../../../db/Users');

module.exports = async function deleteOneUserDb(id) {
  try {
    return await Users.findByIdAndDelete({ _id: id })
      .populate({ path: 'myEventsCreated' })
      .populate({ path: 'myFavorites' })
      .populate({ path: 'myEventsBooked' });
  } catch (error) {
    throw new Error(error.message);
  }
};
