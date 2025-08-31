import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { feedbackControllers } from './feedback.controller';
import { FeedbackValidations } from './feedback.validation';

const router = express.Router();

router.post(
  '/',
  // auth('admin', 'user', 'super_admin'), // uncomment if needed
  validateRequest(FeedbackValidations.createFeedbackValidation),
  feedbackControllers.createFeedback
);

router.get('/', feedbackControllers.getAllFeedbacks);

router.get('/:id', feedbackControllers.getSingleFeedback);

router.patch(
  '/:id',
  // auth('admin', 'super_admin'),
  validateRequest(FeedbackValidations.updateFeedbackValidation),
  feedbackControllers.updateFeedback
);

router.delete(
  '/:id',
  // auth('admin', 'super_admin'),
  feedbackControllers.deleteFeedback
);

export const feedbackRoutes = router;
