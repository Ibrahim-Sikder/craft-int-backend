import { z } from "zod";

// Nested Address Schema
const AddressSchema = z.object({
  village: z.string().optional(),
  postOffice: z.string().optional(),
  postCode: z.string().optional(),
  policeStation: z.string().optional(),
  district: z.string().optional(),
});

// Main Schema
export const CreateAdmissionSchema = z.object({
  body:z.object({
    // Student Information
  studentNameBangla: z.string(),
  fatherNameBangla: z.string(),
  motherNameBangla: z.string(),
  studentName: z.string(),
  mobileNo: z.string(),
  class: z.string(),
  session: z.string(),
  category: z.enum(["resident", "non-resident"]),
  dateOfBirth: z.coerce.date(), // or z.string().transform(val => new Date(val)) if coming from a string
  nidBirth: z.string().optional(),
  bloodGroup: z.string().optional(),
  nationality: z.string(),

  // Father's Information
  fatherName: z.string(),
  fatherMobile: z.string(),
  fatherNid: z.string().optional(),
  fatherProfession: z.string().optional(),
  fatherIncome: z.number().optional(),
  fatherEmail: z.string().email().optional(),
  fatherFb: z.string().url().optional(),

  // Mother's Information
  motherName: z.string(),
  motherMobile: z.string().optional(),
  motherNid: z.string().optional(),
  motherProfession: z.string().optional(),
  motherIncome: z.number().optional(),
  motherEmail: z.string().email().optional(),
  motherFb: z.string().url().optional(),

  // Addresses
  presentAddress: AddressSchema.optional(),
  permanentAddress: AddressSchema.optional(),

  // Guardian Information
  guardianInfo: z.object({
    name: z.string().optional(),
    address: AddressSchema.optional(),
    profession: z.string().optional(),
    relation: z.string().optional(),
    mobile: z.string().optional(),
  }).optional(),

  // Local Guardian
  localGuardian: z.object({
    name: z.string().optional(),
    mobile: z.string().optional(),
    categoryDesignation: z.string().optional(),
  }).optional(),

  // Previous School
  previousSchool: z.object({
    institution: z.string().optional(),
    address: AddressSchema.optional(),
  }).optional(),

  // Documents
  documents: z.object({
    birthCertificate: z.boolean().default(false),
    transferCertificate: z.boolean().default(false),
    characterCertificate: z.boolean().default(false),
    markSheet: z.boolean().default(false),
    photographs: z.boolean().default(false),
  }).optional(),
  termsAccepted: z.boolean()
  })
});


export const UpdateAdmissionSchema = z.object({
  // Student Information
  studentNameBangla: z.string(),
  fatherNameBangla: z.string(),
  motherNameBangla: z.string(),
  studentName: z.string(),
  mobileNo: z.string(),
  class: z.string(),
  session: z.string(),
  category: z.enum(["resident", "non-resident"]),
  dateOfBirth: z.coerce.date(),
  nidBirth: z.string().optional(),
  bloodGroup: z.string().optional(),
  nationality: z.string(),

  // Father's Information
  fatherName: z.string(),
  fatherMobile: z.string(),
  fatherNid: z.string().optional(),
  fatherProfession: z.string().optional(),
  fatherIncome: z.number().optional(),
  fatherEmail: z.string().email().optional(),
  fatherFb: z.string().url().optional(),

  // Mother's Information
  motherName: z.string(),
  motherMobile: z.string().optional(),
  motherNid: z.string().optional(),
  motherProfession: z.string().optional(),
  motherIncome: z.number().optional(),
  motherEmail: z.string().email().optional(),
  motherFb: z.string().url().optional(),

  // Addresses
  presentAddress: AddressSchema.optional(),
  permanentAddress: AddressSchema.optional(),

  // Guardian Information
  guardianInfo: z.object({
    name: z.string().optional(),
    address: AddressSchema.optional(),
    profession: z.string().optional(),
    relation: z.string().optional(),
    mobile: z.string().optional(),
  }).optional(),

  // Local Guardian
  localGuardian: z.object({
    name: z.string().optional(),
    mobile: z.string().optional(),
    categoryDesignation: z.string().optional(),
  }).optional(),

  // Previous School
  previousSchool: z.object({
    institution: z.string().optional(),
    address: AddressSchema.optional(),
  }).optional(),

  // Documents
  documents: z.object({
    birthCertificate: z.boolean().default(false),
    transferCertificate: z.boolean().default(false),
    characterCertificate: z.boolean().default(false),
    markSheet: z.boolean().default(false),
    photographs: z.boolean().default(false),
  }).optional(),
  termsAccepted: z.boolean()
});