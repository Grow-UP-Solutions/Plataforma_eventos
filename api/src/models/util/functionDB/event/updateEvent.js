const Events = require("../../../db/Events");

 module.exports = async function updateOneEventDb(id, newEvent) {
    try {
       return await Events.findByIdAndUpdate({ _id: id }, newEvent, { new: 1 })
          .populate({ path: "organizer" })
          .populate({ path: "categories" });
          
    } catch (error) {
       throw new Error(error.message);
    }
 }
  