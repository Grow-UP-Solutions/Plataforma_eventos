import "../../../DB.js";
import Events from "../../db/Events.js";
import { oneUserDb} from "./UserDb.js";
/**basic user database operations  */
export async function AllEventsDb() {
  try {
    return await Events.find()
      .populate({ path: "organizer" })
      .populate({ path: "category" })
      .populate({ path: "opinions" })
      .exec();
  } catch (error) {
    return ({message:error.message})
  }
}
export async function oneEventDb(id) {
  try {
    return await Events.findById(id)
      .populate({ path: "organizer" })
      .populate({ path: "category" });
  } catch (error) {
    return ({message:error.message})
  }
}
export async function updateOneEventDb(id, newEvent) {
  try {
    return await Events.findByIdAndUpdate({ _id: id }, newEvent, { new: 1 })
      .populate({ path: "organizer" })
      .populate({ path: "category" })
      .populate({ path: "opinions" });
  } catch (error) {
    return ({message:error.message})
  }
}
export async function deleteOneEventDb(id) {
  return await Events.findByIdAndDelete(id);
}

/**Creating event in Database */

export async function createOneEventDb(event) {
  try {
    const eventCreated = new Events(event);
    await eventCreated.save();

    return eventCreated;
  } catch (error) {
    return ({message:error.message})
  }
}

/**generar opinion en evento */
export async function generateEventComment(id, opinions) {
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
    
    return ({message:error.message})
  }
}
