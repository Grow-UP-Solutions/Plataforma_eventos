const Events = require('../../../db/Events');
const UsersFunctionDb = require('../users/index.users');

module.exports = async function generateEventComment(id, opinions) {
  try {
    const { idUser , opinion, rating, picture, dateEvent , eventTitle,time  } = opinions;


    const user = await UsersFunctionDb.oneUser(idUser);
    const event = await Events.findOne({ _id: id });

    event.opinions.push({
      title: user.name,
      picture,
      rating,
      opinion,
      idUser,
      dateEvent,
      eventTitle,
      time,
    });

    await event.save();

    return event.opinions[event.opinions.length - 1];
  } catch (error) {
    throw new Error(error.message);
  }
};
