import express from 'express';
import { announcementControllers } from './announcement.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { announcementValidationSchema } from './announcement.validation';

const router = express.Router();

router.post(
  '/',
  // auth('admin', 'super_admin'),
  validateRequest(announcementValidationSchema),
  announcementControllers.createAnnouncement
);

router.get('/', announcementControllers.getAllAnnouncements);

router.get('/:id', announcementControllers.getSingleAnnouncement);

router.delete(
  '/:id',
  // auth('admin', 'super_admin'),
  announcementControllers.deleteAnnouncement
);

router.patch(
  '/:id',
  // auth('admin', 'super_admin'),
  validateRequest(announcementValidationSchema),
  announcementControllers.updateAnnouncement
);

export const announcementRoutes = router;
