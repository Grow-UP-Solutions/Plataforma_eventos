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
    return ({message:error.message})
  }
}
export async function getOneEvent(id){
  try {
    const event= await oneEventDb(id)
    if(!event){
      throw new Error("El evento no existe id incorrecto")

    }
    return event
  } catch (error) {
    throw new(error.message)
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
    
    const category = await Promise.all(temp);
    
    event.category = category.map((e) => e._id);
    event.organizer = organizer._id;
    const events = await createOneEventDb(event);

    organizer.myEventsCreated.push(events._id);
    await organizer.save();

    return events;
  } catch (error) {
    return ({message:error.message})
  }
}

export async function createOpinionsEvents(id, opinions) {
  try {
    
    const opinionCreat = await generateEventComment(id, opinions);
    return opinionCreat;
    
  } catch (error) {
   
    return ({message:error.message})
    
  }
}

export async function eventsUpdate(id, newEvent) {
  try {
    const newEvents = await updateOneEventDb(id, newEvent);
    return newEvents;
  } catch (error) {
    return ({message:error.message})
  }
}
