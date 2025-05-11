import { z } from 'zod';

const objectIdOrArrayOrNull = z.union([
  z.string().min(1), // single ObjectId string
  z.array(z.string().min(1)), // array of ObjectId strings
  z.null(), // null
]);

const addressSchema = z.object({
  address: z.string().optional(),
  village: z.string().optional(),
  postOffice: z.string().optional(),
  thana: z.string().optional(),
  district: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
});

const educationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  year: z.string(),
  specialization: z.string().optional(),
});

const certificationSchema = z.object({
  certificateName: z.string(),
  issuedBy: z.string(),
  year: z.string(),
  description: z.string().optional(),
});

const experienceSchema = z.object({
  organization: z.string(),
  position: z.string(),
  from: z.string(),
  to: z.string(),
  description: z.string().optional(),
});

const createTeacherValidation = z.object({
  body: z.object({
    // Basic Information
    // teacherId: z.string({
    //   required_error: 'Teacher ID is required'
    // }),
    teacherSerial: z.number({
      required_error: 'Teacher serial is required',
    }),
    smartIdCard: z.string({
      required_error: 'Smart ID card is required',
    }),
    name: z.string({
      required_error: 'Name is required',
    }),
    phone: z.string({
      required_error: 'Phone number is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),
    dateOfBirth: z.coerce.date().optional(),
    bloodGroup: z.string().optional(),
    gender: z.enum(['Male', 'Female', 'Other','']).optional(),
    nationality: z.string().optional(),
    religion: z.string().optional(),
    maritalStatus: z
      .enum(['Single', 'Married', 'Divorced', 'Widowed'])
      .optional(),
    teacherPhoto: z.string().optional(),

    // Address Information
    permanentAddress: addressSchema,
    currentAddress: addressSchema.optional(),
    sameAsPermanent: z.boolean().optional(),

    // Professional Information
    designation: z.string({
      required_error: 'Designation is required',
    }),
    department: z.string({
      required_error: 'Department is required',
    }),
    joiningDate: z.coerce.date({
      required_error: 'Joining date is required',
    }),
    monthlySalary: z.number({
      required_error: 'Monthly salary is required',
    }),
    staffType: z.enum(['Teacher', 'Staff', 'Other'], {
      required_error: 'Staff type is required',
    }),

    // Educational Information
    educationalQualifications: z.array(educationSchema).optional(),
    certifications: z.array(certificationSchema).optional(),
    workExperience: z.array(experienceSchema).optional(),
    section: objectIdOrArrayOrNull.optional(),
    class: objectIdOrArrayOrNull.optional(),
    schedule: objectIdOrArrayOrNull.optional(),
    assignment: objectIdOrArrayOrNull.optional(),
    attendance: objectIdOrArrayOrNull.optional(),
    room: objectIdOrArrayOrNull.optional(),

    // Additional Information
    status: z
      .enum(['Active', 'Inactive'], {
        required_error: 'Status is required',
      })
      .default('Active'),
    language: z.enum(['Bangla', 'English', 'Other']).optional(),
    activeSession: z.string().optional(),
  }),
});

const updateTeacherValidation = z.object({
  body: z.object({
    // Basic Information
    teacherId: z.string().optional(),
    teacherSerial: z.number().optional(),
    smartIdCard: z.string().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email('Invalid email format').optional(),
    dateOfBirth: z.coerce.date().optional(),
    bloodGroup: z.string().optional(),
    gender: z.enum(['Male', 'Female', 'Other']).optional(),
    nationality: z.string().optional(),
    religion: z.string().optional(),
    maritalStatus: z
      .enum(['Single', 'Married', 'Divorced', 'Widowed'])
      .optional(),
    teacherPhoto: z.string().optional(),

    // Address Information
    permanentAddress: addressSchema.optional(),
    currentAddress: addressSchema.optional(),
    sameAsPermanent: z.boolean().optional(),

    // Professional Information
    designation: z.string().optional(),
    department: z.string().optional(),
    joiningDate: z.coerce.date().optional(),
    monthlySalary: z.number().optional(),
    staffType: z.enum(['Teacher', 'Staff', 'Other']).optional(),

    // Educational Information
    educationalQualifications: z.array(educationSchema).optional(),
    certifications: z.array(certificationSchema).optional(),
    workExperience: z.array(experienceSchema).optional(),

    section: objectIdOrArrayOrNull.optional(),
    class: objectIdOrArrayOrNull.optional(),
    schedule: objectIdOrArrayOrNull.optional(),
    assignment: objectIdOrArrayOrNull.optional(),
    attendance: objectIdOrArrayOrNull.optional(),
    room: objectIdOrArrayOrNull.optional(),
    // Additional Information
    status: z.enum(['Active', 'Inactive']).optional(),
    language: z.enum(['Bangla', 'English', 'Other']).optional(),
    activeSession: z.string().optional(),
  }),
});

export const TeacherValidations = {
  createTeacherValidation,
  updateTeacherValidation,
};
