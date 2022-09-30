import "../../../DB.js";
import Events from "../../db/Events.js";
import { oneUserDb, validateEmailUserDb } from "./UserDb.js";
/**basic user database operations  */
export async function AllEventsDb() {
  try {
    return await Events.find()
      .populate({ path: "organizer" })
      .populate({ path: "category" })
      .populate({ path: "opinions" })
      .exec();
  } catch (error) {
    throw new Error("Fallo AllEvento DB");
  }
}
export async function oneEventDb(id) {
  try {
    return await Events.findById(id)
      .populate({ path: "organizer" })
      .populate({ path: "category" });
  } catch (error) {
    throw new Error("Fallo oneEvento DB");
  }
}
export async function updateOneEventDb(id, newEvent) {
  try {
    return await Events.findByIdAndUpdate({ _id: id }, newEvent, { new: 1 })
      .populate({ path: "organizer" })
      .populate({ path: "category" })
      .populate({ path: "opinions" });
  } catch (error) {
    throw new Error("Fallo updateEvent DB");
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
    console.log(error);
    throw new Error("Fallo el crear evento en DB");
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
    const allComent = event.opinions.filter((e) => e.user === user._id);
    user.myOpinions.push(allComent[0]._id);
    user.save();
    
    return event;
  } catch (error) {
    throw new Error("Fallo el gurdado de la opinion en DB", error);
  }
}
