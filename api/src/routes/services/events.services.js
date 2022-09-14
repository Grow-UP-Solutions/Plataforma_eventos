require("../../DB.js");
const Events = require("../../models/db/Events.js");


module.exports = {
  getAllEvents: async function () {
        const allEvents = await Events.find()
            .populate({ path: "organizer" })
            .populate({ path: "category" })
            .populate({ path: "opinions" });
        return allEvents;
    },
    createEvents: async function(event){
        const events= Events.create(event)
        return await events.save()


    }
};
