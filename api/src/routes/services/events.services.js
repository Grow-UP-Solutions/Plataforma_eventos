const { OneCategoryDb } = require('../../models/util/functionDB/CategoryDb.js');

const EventFunctionDb = require('../../models/util/functionDB/event/index.event.js');
const UsersFunctionDb = require('../../models/util/functionDB/users/index.users.js');

async function getAllEvents() {
  try {
    const allEvents = EventFunctionDb.allEvents();
    return allEvents;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getOneEvent(id) {
  try {
    const event = await EventFunctionDb.oneEvent(id);
    if (!event) {
      throw new Error('El evento no existe id incorrecto');
    }
    return event;
  } catch (error) {
    throw new error.message();
  }
}

async function createEvents(event) {
  try {
    const { idOrganizer, categories } = event;
    const organizer = await UsersFunctionDb.oneUser(idOrganizer);

    const temp = categories.map(async (e) => {
      let temp = await OneCategoryDb(e);
      return temp;
    });

    const category = await Promise.all(temp);

    if (organizer.isOrganizer) {
      event.categories = category.map((e) => {
        return e._id;
      });
      event.organizer = organizer._id;

      const events = await EventFunctionDb.createEvent(event);

      organizer.myEventsCreated.push(events._id);

      await organizer.save();

      return events;
    }

    return { msg: 'Aun no eres organizador contacta al administrador' };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function eventsUpdate(id, newEvent) {
  const { categories } = newEvent;
  try {
    if (categories.length > 0) {
      const tempCategory = categories.map(async (e) => {
        let temp = await OneCategoryDb(e);
        return temp;
      });

      const category = await Promise.all(tempCategory);
      newEvent.categories = category.map((e) => {
        return e._id;
      });
    }
    const newEvents = await EventFunctionDb.updateEvent(id, newEvent);


    const allBuyer = await UsersFunctionDb.allBuyerUsers(id)
    if(allBuyer.length> 0) console.log('hay comprador')
    return newEvents;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createOpinionsEvents(id, opinions) {
  try {
    console.log('o2:',opinions)
    const opinionCreat = await EventFunctionDb.commentEvent(id, opinions);
    console.log(opinionCreat)
    return opinionCreat;
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
