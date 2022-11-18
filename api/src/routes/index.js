const { Router } = require('express');
const eventsController = require('./controller/events.controller.js');
const usersController = require('./controller/users.controller.js');
const categoryController = require('./controller/category.controller.js');
const contactContoller = require('../routes/controller/contact.controller.js');
const conversationContoller = require('../routes/controller/conversation.controller.js');
const messageContoller = require('../routes/controller/message.controller.js');
const codeDiscountController = require('../routes/controller/codeDiscount.controller.js');
const pasarelaDePago = require('../routes/controller/pasarelaPagoController/paymentController')

const router = Router();

router.use('/events', eventsController);
router.use('/users', usersController);
router.use('/category', categoryController);
router.use('/contact', contactContoller);
router.use('/conversation', conversationContoller);
router.use('/message', messageContoller);
router.use('/codeDiscount', codeDiscountController);
router.use('/pago', pasarelaDePago )

module.exports = router;
