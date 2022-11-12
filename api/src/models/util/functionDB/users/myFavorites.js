const { getUser } = require('../../../../routes/services/users.services');
const EventFunctionDb = require('../event/index.event');
const UsersFunctionDb = require('./index.users');

module.exports = async function updateMyFavorites(idUser, idEvent) {
  try {
    const user = await getUser(idUser);

    const event = await EventFunctionDb.oneEvent(idEvent);

    user.myFavorites.push(event._id);

    await user.save();

    return event;
  } catch (error) {
    throw new Error(error.message);
  }
};
