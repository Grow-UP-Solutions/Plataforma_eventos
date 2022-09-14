const { Router } = require("express");
const Category = require("../../models/db/Category.js");
require("../../DB.js");
const Events = require("../../models/db/Events.js");
const Users = require("../../models/db/Users.js");
const Opinions = require('../../models/db/Opinions')
const {
  getAllEvents,
  createEvents,
} = require("../services/events.services.js");

const router = Router();

router.get("/", async (req, res) => {
  const allEvents = await getAllEvents();
  return res.json(allEvents);
});
router.post("/", async (req, res) => {
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
   
  } = req.body;

  const users = await Users.findOne({ name: organizer });
  const categories =  category.map(async e=> await Category.find({name: e}))
  console.log(categories)
  const eventCreat = await createEvents({
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
  });
  return eventCreat;
});

module.exports = router;
