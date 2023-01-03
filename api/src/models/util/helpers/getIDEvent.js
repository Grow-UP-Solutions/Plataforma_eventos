const EventFunctionDb = require('../functionDB/event/index.event');

const getEventId = async () => {
  const allEvents = await EventFunctionDb.allEvents();
  if (allEvents.length === 0) return 1;

  const id = allEvents[allEvents.length - 1].idEvent;
  const newId = +id.split('E')[1] + 1;
  return newId;
};

module.exports = getEventId;
