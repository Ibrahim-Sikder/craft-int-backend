import { z } from 'zod';
import { Gender, StudentStatus, StudentType } from './student.utils';


const createStudentValidation = z.object({
  body: z.object({
    smartIdCard: z.string().optional(),
    name: z.string().optional(),
    birthDate: z.string().optional(),
    birthRegistrationNo: z.string().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]).optional(),
    mobile: z.string().optional(),
    bloodGroup: z.string().optional(),
    studentPhoto: z.string({required_error:'Student photo is required!'}).optional(),
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
    sameAsPermanent: z.boolean().default(false),
    presentAddress: z.string().optional(),
    presentDistrict: z.string().optional(),
    presentThana: z.string().optional(),

    // Academic Information
    studentClassRoll: z.string().optional(),
    batch: z.string().optional(),
    section: z.string().optional(),
    className: z.string().optional(),
    activeSession: z.string().optional(),
    status: z.enum([StudentStatus.ACTIVE, StudentStatus.INACTIVE, StudentStatus.GRADUATED]).default(StudentStatus.ACTIVE),
    studentType: z.enum([StudentType.RESIDENTIAL, StudentType.DAY]).optional(),
    additionalNote: z.string().optional(),
    // Fee Information (accepts both string and number)
    admissionFee: z.coerce.number().default(0),
    monthlyFee: z.coerce.number().default(0),
    previousDues: z.coerce.number().default(0),
    sessionFee: z.coerce.number().default(0),
    residenceFee: z.coerce.number().default(0),
    otherFee: z.coerce.number().default(0),
    transportFee: z.coerce.number().default(0),
    boardingFee: z.coerce.number().default(0),

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
    birthDate: z.string().optional(),
    birthRegistrationNo: z.string().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]).optional(),
    mobile: z.string().optional(),
    bloodGroup: z.string().optional(),
    studentPhoto: z.string({required_error:'Student photo is required!'}).optional(),
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

    // Fee Information (accepts both string and number)
    admissionFee: z.coerce.number().optional(),
    monthlyFee: z.coerce.number().optional(),
    previousDues: z.coerce.number().optional(),
    sessionFee: z.coerce.number().optional(),
    residenceFee: z.coerce.number().optional(),
    otherFee: z.coerce.number().optional(),
    transportFee: z.coerce.number().optional(),
    boardingFee: z.coerce.number().optional(),

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
