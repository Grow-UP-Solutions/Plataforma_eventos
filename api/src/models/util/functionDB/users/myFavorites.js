const Users = require('../../../db/Users');
const EventFunctionDb = require('../event/index.event');

module.exports = async function updateMyFavorites(idUser, idEvent) {
  try {
    const user = await Users.findById(idUser);

    const event = await EventFunctionDb.oneEvent(idEvent);

    user.myFavorites.push(event._id);

    await user.save();

    return event;
  } catch (error) {
    throw new Error(error.message);
  }
};
