import { Router } from 'express';
import eventsController from './controller/events.controller.js';
import usersController from './controller/users.controller.js';
import categoryController from './controller/category.controller.js';
import contactContoller from '../routes/controller/contact.controller.js';

const router = Router();

router.use('/events', eventsController);
router.use('/users', usersController);
router.use('/category', categoryController);
router.use('/contact', contactContoller);

export default router;
