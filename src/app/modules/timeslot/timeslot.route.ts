import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { timeSlotControllers } from './timeslot.controller';
import { TimeSlotValidations } from './timeslot.validation';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'super_admin'),
  validateRequest(TimeSlotValidations.createTimeSlotValidation),
  timeSlotControllers.createTimeSlot,
);

router.get('/', timeSlotControllers.getAllTimeSlots);

router.get('/:id', timeSlotControllers.getSingleTimeSlot);

router.delete(
  '/:id',
  auth('admin', 'super_admin'),
  timeSlotControllers.deleteTimeSlot,
);

router.patch(
  '/:id',
  auth('admin', 'super_admin'),
  validateRequest(TimeSlotValidations.updateTimeSlotValidation),
  timeSlotControllers.updateTimeSlot,
);

export const timeSlotRoutes = router;
