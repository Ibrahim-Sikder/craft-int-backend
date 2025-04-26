import { z } from 'zod';

const createUserValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string({ required_error: 'Email is required' }).optional(),
    password: z
      .string({
        required_error: 'Password is required',
      }).optional(),
    role: z.enum(['admin', 'user', 'super_visor','teacher', 'super_admin']).default('user'),
    status: z.enum(['active', 'inactive']).default('active'),
    isDeleted: z.boolean().default(false),
  }),
});



export const userValidations = {
  createUserValidation,
  
};
