import { z } from 'zod';

// Address Schema (all optional, allow null)
const AddressSchema = z.object({
  village: z.string().nullable().optional(),
  postOffice: z.string().nullable().optional(),
  postCode: z.string().nullable().optional(),
  policeStation: z.string().nullable().optional(),
  district: z.string().nullable().optional(),
});

export const CreateAdmissionSchema = z.object({
  body: z.object({
    // Student Information
    studentNameBangla: z.string().nullable().optional(),
    fatherNameBangla: z.string().nullable().optional(),
    motherNameBangla: z.string().nullable().optional(),
    studentName: z.string().nullable().optional(),
    mobileNo: z.string().nullable().optional(),
    class: z.array(z.string().nullable()).nullable().optional(),
    session: z.string().nullable().optional(),
    category: z.string().nullable().optional(),
    dateOfBirth: z.coerce.date().nullable().optional(),
    nidBirth: z.string().nullable().optional(),
    bloodGroup: z.string().nullable().optional(),
    nationality: z.string().nullable().optional(),
    paymentStatus: z.string().optional(),
    admissionFee: z.number().optional(),
    monthlyFee: z.number().optional(),

    // Parent Information
    fatherName: z.string().nullable().optional(),
    fatherMobile: z.string().nullable().optional(),
    fatherNid: z.string().nullable().optional(),
    fatherProfession: z.string().nullable().optional(),
    fatherIncome: z.number().nullable().optional(),

    motherName: z.string().nullable().optional(),
    motherMobile: z.string().nullable().optional(),
    motherNid: z.string().nullable().optional(),
    motherProfession: z.string().nullable().optional(),
    motherIncome: z.number().nullable().optional(),

    // Addresses
    presentAddress: AddressSchema.nullable().optional(),
    permanentAddress: AddressSchema.nullable().optional(),

    // Guardian Information
    guardianInfo: z
      .object({
        name: z.string().nullable().optional(),
        relation: z.string().nullable().optional(),
        mobile: z.string().nullable().optional(),
        address: z.string().nullable().optional(),
      })
      .nullable()
      .optional(),

    // Previous School
    previousSchool: z
      .object({
        institution: z.string().nullable().optional(),
        address: z.string().nullable().optional(),
      })
      .nullable()
      .optional(),

    // Documents
    documents: z
      .object({
        birthCertificate: z.boolean().nullable().optional(),
        transferCertificate: z.boolean().nullable().optional(),
        characterCertificate: z.boolean().nullable().optional(),
        markSheet: z.boolean().nullable().optional(),
        photographs: z.boolean().nullable().optional(),
      })
      .nullable()
      .optional(),

    // Terms
    termsAccepted: z.boolean().nullable().optional(),
  }),
});
