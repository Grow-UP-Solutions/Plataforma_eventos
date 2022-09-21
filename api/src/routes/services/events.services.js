require("../../DB.js");
const { updateMany } = require("../../models/db/Category.js");
const Category = require("../../models/db/Category.js");
const { find, findOne } = require("../../models/db/Date.js");
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
    const {
      name,
      nick,
      description,
      date,
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
    const eventDB = await findOne({ name: name });
    const users = await Users.findOne({ name: organizer });
    const temp = category.map(async (e) => await Category.findOne({ name: e }));
    const categories = await Promise.all(temp);
    if (eventDB) {
      return { msg: "El evento ya existe" };
    } else {
      const events = new Events({
        name,
        nick,
        description,
        date,
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
  },
  eventsUpdate: async function (id, newEvent) {
    const newEvents = await Events.findByIdAndUpdate({ _id: id }, newEvent, {
      new: 1,
    });
    return newEvents;
  },
};
