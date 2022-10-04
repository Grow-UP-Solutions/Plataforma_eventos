import { OneCategoryDb } from "../../models/util/functionDB/CategoryDb.js";
import {
  oneUserDb,
  
} from "../../models/util/functionDB/UserDb.js";
import {
  AllEventsDb,
  createOneEventDb,
  generateEventComment,
  oneEventDb,
  updateOneEventDb,
} from "../../models/util/functionDB/EventesDb.js";


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
    const { idOrganizer, categories } = event;
    const organizer = await oneUserDb(idOrganizer);
    
    const temp = categories.map(async (e) => {
      let temp = await OneCategoryDb(e);
      return temp;
    });
    console.log('organaizer TEMP service',temp)
    const category = await Promise.all(temp);
    console.log('organaizer CATEGORY service',category)
    event.categories = category.map((e) => e._id);
    event.organizer = organizer._id;
    const events = await createOneEventDb(event);

    organizer.myEventsCreated.push(events._id);
    await organizer.save();

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
