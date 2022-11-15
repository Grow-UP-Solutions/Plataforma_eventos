require('../../../../DB')
const Users = require('../../../db/Users');

module.exports = async function oneUserDb(id) {
  const idOrganizer = id;
  if (!idOrganizer) {
    return { msg: 'Se rerquiere el id del organizador' };
  }
  try {
    return await Users.findById({ _id: idOrganizer })
      .populate({ path: 'myEventsCreated' })
      .populate({ path: 'myFavorites' })
      .populate({ path: 'myEventsBooked' })
      .populate('message');
  } catch (error) {
    throw new Error(error.message);
  }
};
