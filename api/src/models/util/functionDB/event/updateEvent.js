const Events = require('../../../db/Events');

module.exports = async function updateOneEventDb(id, newEvent) {
  try {
    const eventsUpdate = await Events.findByIdAndUpdate({ _id: id }, newEvent, { new: 1 })
      .populate({ path: 'organizer' })
      .populate({ path: 'categories' });

    return eventsUpdate;
  } catch (error) {
    throw new Error(error.message);
  }
};
