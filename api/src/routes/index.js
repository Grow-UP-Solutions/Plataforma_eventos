const { Router } = require("express");
const eventsController = require("./controller/events.controller");
const usersController = require("./controller/users.controller");
const categoryController = require("./controller/category.controler");

const router = Router();

router.use("/events", eventsController);
router.use("/users", usersController);
router.use("/category", categoryController);

module.exports = router;
