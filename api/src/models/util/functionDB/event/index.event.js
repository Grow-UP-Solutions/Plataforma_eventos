const EventFunctionDb = {
   allEvents: require("./findAllEventsDb"),
   oneEvent: require("./findOneEventDb"),
   updateEvent: require("./updateEvent"),
   commentEvent: require("./generateEventComment"),
   updateRating: require("./updateEventRating"),
   createEvent: require("./createEvent"),
};

module.exports = EventFunctionDb;
