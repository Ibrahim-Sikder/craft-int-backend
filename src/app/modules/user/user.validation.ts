import { z } from 'zod';

const createUserValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string({ required_error: 'Email is required' }).optional(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, { message: 'Password must be at least 6 characters long' }),
    role: z.enum(['admin', 'user', 'super_visor']).default('user'),
    status: z.enum(['active', 'inactive']).default('active'),
    isDeleted: z.boolean().default(false),
  }),
});



export const userValidations = {
  createUserValidation,
  
};
