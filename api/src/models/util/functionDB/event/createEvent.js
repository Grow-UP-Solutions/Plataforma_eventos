const Events = require("../../../db/Events");

module.exports = async function createOneEventDb(event) {
    try {
       const eventCreated = new Events(event);
       await eventCreated.save();
 
       return eventCreated;

    } catch (error) {
        
       console.log(error.message);
       throw new Error(error.message);
    }
 }