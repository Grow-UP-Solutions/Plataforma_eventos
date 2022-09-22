require("../../DB.js");

const Category = require("../../models/db/Category.js");

const Events = require("../../models/db/Events.js");
const Users = require("../../models/db/Users.js");

module.exports = {
  getAllEvents: async function () {
    const allEvents = await Events.find()
      .populate({ path: "organizer" })
      .populate({ path: "category" })
      .populate({ path: "opinions" });
    return allEvents;
  },
  createEvents: async function (event) {
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
       
     const eventDB = await Events.findOne({ name: name, date: dates.date });
 
     const users = await Users.findOne({ name: organizer });
 
     const temp = category.map(
       async (e) => await Category.findOne({ name: e })
     );
 
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
       users.myEventsCreated.push(events._id);
       await users.save();
       return await events.save();
     }
   } catch (error) {
    console.log('fallo service', error)
   }
  },

  eventsUpdate: async function (id, newEvent) {
    const newEvents = await Events.findByIdAndUpdate({ _id: id }, newEvent, {
      new: 1,
    });
    return newEvents;
  },
};
