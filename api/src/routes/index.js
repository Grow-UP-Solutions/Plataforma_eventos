const { Router } = require("express");
const eventsController = require("./controller/events.controller");
const usersController = require("./controller/users.controller");
const categoryController = require("./controller/category.controler");
const contactContoller = require('../routes/controller/contact.controller')
const router = Router();

router.use("/events", eventsController);
router.use("/users", usersController);
router.use("/category", categoryController);
router.use('/contact', contactContoller)
module.exports = router;
