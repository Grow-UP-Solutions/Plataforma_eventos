const Events = require("../../../db/Events");

module.exports = async function AllEventsDb() {
    try {

       return await Events.find()
          .populate({ path: "organizer" })
          .populate({ path: "categories" });
          
    } catch (error) {

       throw new Error(error.message);
    }
 }
 