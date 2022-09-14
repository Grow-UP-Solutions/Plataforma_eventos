const { Router } = require("express");
const Category = require("../../models/db/Category.js");
require("../../DB.js");
const Events = require("../../models/db/Events.js");
const Users = require("../../models/db/Users.js");
const Opinions = require("../../models/db/Opinions");
const {
  getAllEvents,
  createEvents,
} = require("../services/events.services.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allEvents = await getAllEvents();
    return res.json(allEvents);
  } catch (error) {
    return res.status(400).json({ ERROR_EVENTS: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const event = req.body;

    const eventCreat = await createEvents(event);

    return res.status(200).json(eventCreat);
  } catch (error) {
    return res.status(400).json({ ERROR_EVENT_CREATE: error });
  }
});

module.exports = router;
