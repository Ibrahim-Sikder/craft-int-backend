/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { staffControllers } from './staff.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { StaffValidations } from './staff.validation'; // If separate from Teacher

const router = express.Router();

router.post(
  '/',
  // auth('admin', 'super_admin'),
  // validateRequest(StaffValidations.createStaffValidation),
  staffControllers.createStaff,
);
router.get('/', staffControllers.getAllStaff);

router.get(
  '/:id',
  staffControllers.getSingleStaff,
);
router.delete(
  '/:id',
  // auth('admin', 'super_admin'),
  staffControllers.deleteStaff,
);

router.patch(
  '/:id',
  // auth('admin', 'super_admin'),
  // validateRequest(StaffValidations.updateStaffValidation),
  staffControllers.updateStaff,
);

export const staffRoutes = router;
