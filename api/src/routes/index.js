import { Router } from 'express';
import eventsController from './controller/events.controller.js';
import usersController from './controller/users.controller.js';
import categoryController from './controller/category.controller.js';
import contactContoller from '../routes/controller/contact.controller.js';
import conversationContoller from '../routes/controller/conversation.controller.js';
import messageContoller from '../routes/controller/message.controller.js';

const router = Router();

router.use('/events', eventsController);
router.use('/users', usersController);
router.use('/category', categoryController);
router.use('/contact', contactContoller);
router.use('/conversation', conversationContoller )
router.use('/message', messageContoller )

export default router;
