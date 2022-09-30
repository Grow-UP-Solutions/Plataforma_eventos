import { OneCategoryDb } from "../../models/util/functionDB/CategoryDb.js";
import {
  oneUserDb,
  validateEmailUserDb,
} from "../../models/util/functionDB/UserDb.js";
import {
  AllEventsDb,
  createOneEventDb,
  generateEventComment,
  oneEventDb,
  updateOneEventDb,
} from "../../models/util/functionDB/EventesDb.js";
import Events from "../../models/db/Events.js";

export async function getAllEvents() {
  try {
    const allEvents = AllEventsDb();
    return allEvents;
  } catch (error) {
    throw new Error(`FALLO GET ALL EVENTS SERVICES, ${error}`);
  }
}
export async function createEvents(event) {
  try {
    const { emailOganizer, category } = event;

    const users = await validateEmailUserDb(emailOganizer);
    const {} = users;
    const temp = category.map(async (e) => {
      let temp = await OneCategoryDb(e);
      return temp;
    });
    const categories = await Promise.all(temp);
    event.category = categories.map((e) => e._id);
    event.organizer = users._id;
    const events = await createOneEventDb(event);

    users.myEventsCreated.push(events._id);
    await users.save();

    return events;
  } catch (error) {
    console.log(error);
    throw new Error(`FALLO CREATE EVENTS SERVICES, ${error}`);
  }
}

export async function createOpinionsEvents(id, opinions) {
  try {
    
    const opinionCreat = await generateEventComment(id, opinions);
    return opinionCreat;
    
  } catch (error) {
   
    throw new Error('Fallo el servicio en opiniones',error)
    
  }
}

export async function eventsUpdate(id, newEvent) {
  try {
    const newEvents = await updateOneEventDb(id, newEvent);
    return newEvents;
  } catch (error) {
    return { FALLO_UPDATEEVENTE_SERVICE: error };
  }
}
