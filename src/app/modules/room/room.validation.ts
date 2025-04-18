import { z } from 'zod';

const createRoomValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Room name is required',
      })
      .min(1, 'Room name must not be empty'),
    capacity: z.number().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

const updateRoomValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    capacity: z.number().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const RoomValidations = {
  createRoomValidation,
  updateRoomValidation,
};
