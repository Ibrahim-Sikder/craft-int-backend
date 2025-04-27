import express from 'express';
import { roomControllers } from './room.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { RoomValidations } from './room.validation';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'super_admin'),
  validateRequest(RoomValidations.createRoomValidation),
  roomControllers.createRoom
);

router.get('/', roomControllers.getAllRooms);

router.get('/:id', roomControllers.getSingleRoom);

router.delete(
  '/:id',
  auth('admin', 'super_admin'),
  roomControllers.deleteRoom
);

router.patch(
  '/:id',
  auth('admin', 'super_admin'),
  validateRequest(RoomValidations.updateRoomValidation),
  roomControllers.updateRoom
);

export const roomRoutes = router;
