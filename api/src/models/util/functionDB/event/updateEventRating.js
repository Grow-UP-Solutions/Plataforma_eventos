const Events = require("../../../db/Events");

module.exports = async function updateEventRating(idEvent, rating) {
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