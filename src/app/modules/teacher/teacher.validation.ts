import { z } from 'zod';

const addressSchema = z.object({
  address: z.string().optional(),
  village: z.string().optional(),
  postOffice: z.string().optional(),
  thana: z.string().optional(),
  district: z.string().optional(),
  sameAsPermanent: z.boolean().optional(),
});

const certificateSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
});

const createTeacherValidation = z.object({
  body: z.object({
    teacherId: z.string().optional(),
    teacherSerial: z.number({
      required_error: 'Teacher serial is required',
    }),
    smartIdCard: z.string().optional(),

    name: z.string({ required_error: 'Name is required' }),
    englishName: z.string({ required_error: 'English name is required' }),
    gender: z.enum(['Male', 'Female', 'Other'], {
      required_error: 'Gender is required',
    }),

    personalPhone: z.string().optional(),
    teacherEmail: z.string().email().optional(),
    bloodGroup: z.string().optional(),
    image: z.string().optional(),
    dateOfBirth: z.coerce.date().optional(),

    permanentAddress: addressSchema,
    currentAddress: addressSchema,

    professionalInfo: z.object({
      designation: z.string().optional(),
      monthlySalary: z.number().optional(),
      department: z.string().optional(),
      staffType: z.enum(['Teacher', 'Staff', 'Other']).optional(),
      joiningDate: z.coerce.date().optional(),
      residenceType: z.enum(['Residential', 'Non-residential']).optional(),
    }),

    additionalInfo: z.object({
      guardianPhone: z.string().optional(),
      youtubeChannel: z.string().optional(),
      facebookProfile: z.string().optional(),
      twitterProfile: z.string().optional(),
      status: z.enum(['Active', 'Inactive']).optional(),
      language: z.enum(['Bangla', 'English', 'Other']).optional(),
    }),

    sessionInfo: z.object({
      activeSession: z.string({
        required_error: 'Active session is required',
      }),
    }),

    certificates: z.array(certificateSchema).optional(),
  }),
});

const updateTeacherValidation = z.object({
  body: z.object({
    teacherId: z.string().optional(),
    teacherSerial: z.number().optional(),
    smartIdCard: z.string().optional(),

    name: z.string().optional(),
    englishName: z.string().optional(),
    gender: z.enum(['Male', 'Female', 'Other']).optional(),

    personalPhone: z.string().optional(),
    teacherEmail: z.string().email().optional(),
    bloodGroup: z.string().optional(),
    image: z.string().optional(),
    dateOfBirth: z.coerce.date().optional(),

    permanentAddress: addressSchema.optional(),
    currentAddress: addressSchema.optional(),

    professionalInfo: z.object({
      designation: z.string().optional(),
      monthlySalary: z.number().optional(),
      department: z.string().optional(),
      staffType: z.enum(['Teacher', 'Staff', 'Other']).optional(),
      joiningDate: z.coerce.date().optional(),
      residenceType: z.enum(['Residential', 'Non-residential']).optional(),
    }).optional(),

    additionalInfo: z.object({
      guardianPhone: z.string().optional(),
      youtubeChannel: z.string().optional(),
      facebookProfile: z.string().optional(),
      twitterProfile: z.string().optional(),
      status: z.enum(['Active', 'Inactive']).optional(),
      language: z.enum(['Bangla', 'English', 'Other']).optional(),
    }).optional(),

    sessionInfo: z.object({
      activeSession: z.string().optional(),
    }).optional(),

    certificates: z.array(certificateSchema).optional(),
  }),
});

export const TeacherValidations = {
  createTeacherValidation,
  updateTeacherValidation,
};
