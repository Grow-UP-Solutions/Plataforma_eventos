import "../../DB.js";
import Events from "../../models/db/Events.js";

import { OneCategoryDb, } from "../../models/util/functionDB/CategoryDb.js";
import { AllEventsDb}  from "../../models/util/functionDB/EventesDb.js"
import { OneUserDb } from "../../models/util/functionDB/UserDb.js";



  export async function getAllEvents() {
    const allEvents = AllEventsDb();
    return allEvents;
  }
  export async function createEvents (event) {
    try {
      const {
        name,
        nick,
        description,
        dates,
        time,
        state,
        city,
        price,
        cupos,
        rating,
        enLinea,
        pictures,
        participants,
        organizer,
        category,
      } = event;

      const eventDB = await Events.findOne({ name: name });

      const users = await OneUserDb(organizer);
      const temp = category.map(async (e) => {
        let temp = await OneCategoryDb(e);
        return temp;
      });

      const categories = await Promise.all(temp);

      if (eventDB) {
        return { msg: "El evento ya existe" };
      } else {
        const events = new Events({
          name,
          nick,
          description,
          dates,
          time,
          state,
          city,
          price,
          cupos,
          rating,
          enLinea,
          pictures,
          participants,
          organizer: users._id,
          category: categories.map((e) => e._id),
        });
        await events.save();
        console.log("EVENTES", events);
        users.myEventsCreated.push(events._id);
        await users.save();
        return events;
      }
    } catch (error) {
      console.log("fallo service event", error);
    }
  }

  export async function eventsUpdate (id, newEvent) {
    const newEvents = await Events.findByIdAndUpdate({ _id: id }, newEvent, {
      new: 1,
    });
    return newEvents;
  }
