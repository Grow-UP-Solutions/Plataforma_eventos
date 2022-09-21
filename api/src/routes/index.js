const { Router } = require("express");
const eventsController = require("./controller/events.controller");
const usersController = require("./controller/users.controller");
const categoryController = require("./controller/category.controller");
const contactContoller = require('../routes/controller/contact.controller')
const dateController=require('../routes/controller/date.controller')
const router = Router();

router.use("/events", eventsController);
router.use("/users", usersController);
router.use("/category", categoryController);
router.use('/contact', contactContoller)
router.use('/date', dateController)
module.exports = router;
