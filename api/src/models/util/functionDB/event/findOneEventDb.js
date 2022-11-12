const Events = require("../../../db/Events");

const findOneEventDb = async (id) => {
   try {
      const event = await Events.findOne({ _id: id });
      
      return event;
   } catch (error) {
      console.log("DB", error.message);
      throw new Error(error.message);
   }
};

module.exports = findOneEventDb;
