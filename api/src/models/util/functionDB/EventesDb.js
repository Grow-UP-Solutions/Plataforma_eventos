require("../../../DB.js");
const Events = require("../../db/Events.js");
const { oneUserDb } = require("./UserDb.js");

/**basic user database operations  */
async function AllEventsDb() {
   try {
      return await Events.find()
         .populate({ path: "organizer" })
         .populate({ path: "categories" });
   } catch (error) {
      throw new Error(error.message);
   }
}

async function updateOneEventDb(id, newEvent) {
   try {
      return await Events.findByIdAndUpdate({ _id: id }, newEvent, { new: 1 })
         .populate({ path: "organizer" })
         .populate({ path: "categories" });
   } catch (error) {
      throw new Error(error.message);
   }
}
async function deleteOneEventDb(id) {
   return await Events.findByIdAndDelete(id);
}

/**Creating event in Database */

async function createOneEventDb(event) {
   try {
      const eventCreated = new Events(event);
      await eventCreated.save();

      return eventCreated;
   } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
   }
}

/**generar opinion en evento */
async function generateEventComment(id, opinions) {
   try {
      const { opinion, idUser, rating } = opinions;

      const user = await oneUserDb(idUser);
      const event = await Events.findOne({ _id: id });

      event.opinions.push({
         title: user.name,
         opinion,
         picture: user.picture,
         user: user._id,
         rating,
      });
      await event.save();

      return event.opinions[event.opinions.length - 1];
   } catch (error) {
      throw new Error(error.message);
   }
}

async function updateEventRating(idEvent, rating) {
   try {
      const ratinEvente = await Events.findOne({ _id: idEvent });
      if (ratinEvente) {
         ratinEvente.rating = rating;
         return await ratinEvente.save();
      }
      return { msg: "Evento no encontrado" };
   } catch (error) {
      throw new Error(error.message);
   }
}

const findOneEventDb= async (id) => {
   try {
      const event = await Events.findOne({ _id: id });
      console.log("DB", event.title);
      return event;
   } catch (error) {
      console.log("DB", error.message);
      throw new Error(error.message);
   }
};

module.exports = {
   AllEventsDb,
   findOneEventDb,
   updateOneEventDb,
   deleteOneEventDb,
   createOneEventDb,
   generateEventComment,
   updateEventRating,
};
