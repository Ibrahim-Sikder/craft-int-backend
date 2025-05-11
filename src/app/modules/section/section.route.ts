import express from 'express';
import { sectionControllers } from './section.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { SectionValidations } from './section.validation';

const router = express.Router();

router.post(
  '/',
  // auth('admin', 'super_admin'),
  validateRequest(SectionValidations.createSectionValidation),
  sectionControllers.createSection
);

router.get('/', sectionControllers.getAllSections);

router.get('/:id', sectionControllers.getSingleSection);

router.patch(
  '/:id',
  // auth('admin', 'super_admin'),
  validateRequest(SectionValidations.updateSectionValidation),
  sectionControllers.updateSection
);

router.delete(
  '/:id',
  // auth('admin', 'super_admin'),
  sectionControllers.deleteSection
);

export const sectionRoutes = router;
