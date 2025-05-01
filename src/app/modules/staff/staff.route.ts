import express from 'express';
import { staffControllers } from './staff.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { StaffValidations } from './staff.validation'; // If separate from Teacher

const router = express.Router();

// Create staff
router.post(
  '/',
  auth('admin', 'super_admin'),
  validateRequest(StaffValidations.createStaffValidation),
  staffControllers.createStaff,
);

// Get all staff
router.get(
  '/',
  auth('admin', 'super_admin'),
  staffControllers.getAllStaff,
);

// Get single staff
router.get(
  '/:id',
  auth('admin', 'super_admin'),
  staffControllers.getSingleStaff,
);

// Delete staff
router.delete(
  '/:id',
  auth('admin', 'super_admin'),
  staffControllers.deleteStaff,
);

// Update staff
router.patch(
  '/:id',
  auth('admin', 'super_admin'),
  validateRequest(StaffValidations.updateStaffValidation),
  staffControllers.updateStaff,
);

export const staffRoutes = router;
