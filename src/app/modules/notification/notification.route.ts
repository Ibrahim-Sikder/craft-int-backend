import express from 'express';
import { notificationControllers } from './notification.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { NotificationValidation } from './notification.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(NotificationValidation.createNotification),
  notificationControllers.createNotification
);

router.get('/', notificationControllers.getAllNotifications);
router.get('/:id', notificationControllers.getSingleNotification);

router.patch(
  '/:id',
  validateRequest(NotificationValidation.updateNotification),
  notificationControllers.updateNotification
);

router.delete('/:id', notificationControllers.deleteNotification);

export const notificationRoutes = router;
