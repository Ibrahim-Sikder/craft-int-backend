import { z } from 'zod';
import { Gender, StudentStatus, StudentType } from './student.utils';
const createStudentValidation = z.object({
  body: z.object({

    smartIdCard: z.string().optional(),
    name: z.string({
      required_error: 'Name is required',
    }),
    birthDate: z.string({
      required_error: 'Birth date is required',
    }),
    birthRegistrationNo: z.string().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER], {
      required_error: 'Gender is required',
    }),
    mobile: z.string({
      required_error: 'Mobile number is required',
    }),
    bloodGroup: z.string().optional(),
    image: z.string().optional(),

    // Family Information
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    guardianName: z.string().optional(),
    guardianMobile: z.string().optional(),
    relation: z.string().optional(),
    nidFatherMotherGuardian: z.string().optional(),

    // Address Information
    permanentAddress: z.string({
      required_error: 'Permanent address is required',
    }),
    permanentDistrict: z.string({
      required_error: 'Permanent district is required',
    }),
    permanentThana: z.string({
      required_error: 'Permanent thana is required',
    }),
    sameAsPermanent: z.boolean().default(false),
    presentAddress: z.string().optional(),
    presentDistrict: z.string().optional(),
    presentThana: z.string().optional(),

    // Academic Information
    className: z.string({
      required_error: 'Class name is required',
    }),
    studentClassRoll: z.string({
      required_error: 'Student class roll is required',
    }),
    batch: z.string().optional(),
    section: z.string().optional(),
    activeSession: z.string({
      required_error: 'Active session is required',
    }),
    status: z.enum([StudentStatus.ACTIVE, StudentStatus.INACTIVE, StudentStatus.GRADUATED]).default(StudentStatus.ACTIVE),
    studentType: z.enum([StudentType.RESIDENTIAL, StudentType.DAY]).optional(),
    additionalNote: z.string().optional(),

    // Fee Information
    admissionFee: z.number().default(0),
    monthlyFee: z.number().default(0),
    previousDues: z.number().default(0),
    sessionFee: z.number().default(0),
    residenceFee: z.number().default(0),
    otherFee: z.number().default(0),
    transportFee: z.number().default(0),
    boardingFee: z.number().default(0),

    // Settings
    sendAdmissionSMS: z.boolean().default(false),
    studentSerial: z.string().optional(),
    sendAttendanceSMS: z.boolean().default(false),
  }),
});

const updateStudentValidation = z.object({
  body: z.object({
    studentId: z.string().optional(),
    smartIdCard: z.string().optional(),
    name: z.string().optional(),
    birthDate: z.date().optional(),
    birthRegistrationNo: z.string().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]).optional(),
    mobile: z.string().optional(),
    bloodGroup: z.string().optional(),
    image: z.string().optional(),

    // Family Information
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    guardianName: z.string().optional(),
    guardianMobile: z.string().optional(),
    relation: z.string().optional(),
    nidFatherMotherGuardian: z.string().optional(),

    // Address Information
    permanentAddress: z.string().optional(),
    permanentDistrict: z.string().optional(),
    permanentThana: z.string().optional(),
    sameAsPermanent: z.boolean().optional(),
    presentAddress: z.string().optional(),
    presentDistrict: z.string().optional(),
    presentThana: z.string().optional(),

    // Academic Information
    className: z.string().optional(),
    studentClassRoll: z.string().optional(),
    batch: z.string().optional(),
    section: z.string().optional(),
    activeSession: z.string().optional(),
    status: z.enum([StudentStatus.ACTIVE, StudentStatus.INACTIVE, StudentStatus.GRADUATED]).optional(),
    studentType: z.enum([StudentType.RESIDENTIAL, StudentType.DAY]).optional(),
    additionalNote: z.string().optional(),

    // Fee Information
    admissionFee: z.number().optional(),
    monthlyFee: z.number().optional(),
    previousDues: z.number().optional(),
    sessionFee: z.number().optional(),
    residenceFee: z.number().optional(),
    otherFee: z.number().optional(),
    transportFee: z.number().optional(),
    boardingFee: z.number().optional(),

    // Settings
    sendAdmissionSMS: z.boolean().optional(),
    studentSerial: z.string().optional(),
    sendAttendanceSMS: z.boolean().optional(),
  }),
});

export const StudentValidations = {
  createStudentValidation,
  updateStudentValidation,
};
