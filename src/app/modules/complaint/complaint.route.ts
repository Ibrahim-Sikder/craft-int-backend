import express from 'express';
import { complaintControllers } from './complaint.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { ComplaintValidation } from './complaint.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ComplaintValidation.createComplaint),
  complaintControllers.createComplaint
);

router.get('/', complaintControllers.getAllComplaints);
router.get('/:id', complaintControllers.getSingleComplaint);
router.patch(
  '/:id',
  validateRequest(ComplaintValidation.updateComplaint),
  complaintControllers.updateComplaint
);
router.delete('/:id', complaintControllers.deleteComplaint);

export const complaintRoutes = router;
