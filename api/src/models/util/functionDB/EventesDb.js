require('../../../DB.js');
const Events = require('../../db/Events.js');
const { oneUserDb } = require('./UserDb.js');
/**basic user database operations  */
 async function AllEventsDb() {
  try {
    return await Events.find()
      .populate({ path: 'organizer' })
      .populate({ path: 'category' })
      .populate({ path: 'opinions' })
      .exec();
  } catch (error) {
    return { message: error.message };
  }
}
 async function oneEventDb(id) {
  try {
    return await Events.findById(id)
      .populate({ path: 'organizer' })
      .populate({ path: 'category' });
  } catch (error) {
    return { message: error.message };
  }
}
 async function updateOneEventDb(id, newEvent) {
  try {
    return await Events.findByIdAndUpdate({ _id: id }, newEvent, { new: 1 })
      .populate({ path: 'organizer' })
      .populate({ path: 'category' })
      .populate({ path: 'opinions' });
  } catch (error) {
    return { message: error.message };
  }
}
 async function deleteOneEventDb(id) {
  return await Events.findByIdAndDelete(id);
}

/**Creating event in Database */

 async function createOneEventDb(event) {
  try {
    const eventCreated = new Events(event);
    await eventCreated.save();

    return eventCreated;
  } catch (error) {
    return { message: error.message };
  }
}

/**generar opinion en evento */
 async function generateEventComment(id, opinions) {
  try {
    const { title, opinion, idUser, rating } = opinions;

    const user = await oneUserDb(idUser);
    const event = await oneEventDb(id);

    event.opinions.push({
      title,
      opinion,
      user: user._id,
      rating,
    });
    await event.save();

    return event.opinions;
  } catch (error) {
    return { message: error.message };
  }
}

module.exports = {
  AllEventsDb,
  oneEventDb,
  updateOneEventDb,
  deleteOneEventDb,
  createOneEventDb,
  generateEventComment,
};
