const { OneCategoryDb } = require("../../models/util/functionDB/CategoryDb.js");
const { oneUserDb } = require("../../models/util/functionDB/UserDb.js");
const {
   AllEventsDb,
   createOneEventDb,
   generateEventComment,
   updateOneEventDb,
   findOneEventDb,
} = require("../../models/util/functionDB/EventesDb.js");
const {
   eventCreateOrganizer,
} = require("../../models/util/mailer/eventeCreateOrganizer.js");
const {
   eventCreateAdministrador,
} = require("../../models/util/mailer/eventCreateAdministrador.js");

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
      const event = await findOneEventDb(id);
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

      if (organizer.isOrganizer) {
         event.categories = category.map((e) => {
            return e._id;
         });
         event.organizer = organizer._id;

         const events = await createOneEventDb(event);

         organizer.myEventsCreated.push(events._id);

         await organizer.save();

         events.isPublic
            ? eventCreateOrganizer(events, organizer)
            : eventCreateAdministrador(events);

         return events;
      }

      return { msg: "Aun no eres organizador contacta al administrador" };
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
   const { categories } = newEvent;
   try {
      if (categories.length > 0) {
         const temp = categories.map(async (e) => {
            let temp = await OneCategoryDb(e);
            return temp;
         });

         const category = await Promise.all(temp);
         newEvent.categories = category.map((e) => {
            return e._id;
         });
      }
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
