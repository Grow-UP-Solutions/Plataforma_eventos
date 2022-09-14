const { Router } = require("express");
const eventsController = require('./controller/events.controller')
const usersController = require('./controller/users.controller')


const router = Router();

router.use("/events", eventsController);
router.use("/users", usersController)


module.exports = router;