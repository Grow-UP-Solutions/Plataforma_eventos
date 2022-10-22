const { OneCategoryDb } = require("../../models/util/functionDB/CategoryDb.js");
const { oneUserDb } = require("../../models/util/functionDB/UserDb.js");
const {
  AllEventsDb,
  createOneEventDb,
  generateEventComment,
  findOneEvent,
  updateOneEventDb,
} = require("../../models/util/functionDB/EventesDb.js");

async function getAllEvents() {
  try {
    const allEvents = AllEventsDb();
    return allEvents;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function getOneEvent(id) {
  try {
    const event = await findOneEvent(id);
    if (!event) {
      throw new Error("El evento no existe id incorrecto");
    }
    return event;
  } catch (error) {
    throw new error.message();
  }
}
async function createEvents(event) {
  try {
    const { idOrganizer, categories } = event;
    const organizer = await oneUserDb(idOrganizer);

    const temp = categories.map(async (e) => {
      let temp = await OneCategoryDb(e);
      return temp;
    });

    const category = await Promise.all(temp);

    event.category = category.map((e) => e._id);
    event.organizer = organizer._id;
    const events = await createOneEventDb(event);

    organizer.myEventsCreated.push(events._id);
    await organizer.save();

    return events;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createOpinionsEvents(id, opinions) {
  try {
    const opinionCreat = await generateEventComment(id, opinions);
    return opinionCreat;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function eventsUpdate(id, newEvent) {
  try {
    const newEvents = await updateOneEventDb(id, newEvent);
    return newEvents;
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = {
  getAllEvents,
  getOneEvent,
  createEvents,
  createOpinionsEvents,
  eventsUpdate,
};
