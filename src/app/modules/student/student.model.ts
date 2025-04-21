import { model, Schema } from 'mongoose';
import { IStudent } from './student.interface';
import { Gender, StudentStatus, StudentType } from './student.utils';

const studentSchema = new Schema<IStudent>(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    smartIdCard: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    birthRegistrationNo: {
      type: String,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
    },
    image: {
      type: String,
    },

    // Family Information
    fatherName: {
      type: String,
    },
    motherName: {
      type: String,
    },
    guardianName: {
      type: String,
    },
    guardianMobile: {
      type: String,
    },
    relation: {
      type: String,
    },
    nidFatherMotherGuardian: {
      type: String,
    },

    // Address Information
    permanentAddress: {
      type: String,
      required: true,
    },
    permanentDistrict: {
      type: String,
      required: true,
    },
    permanentThana: {
      type: String,
      required: true,
    },
    sameAsPermanent: {
      type: Boolean,
      default: false,
    },
    presentAddress: {
      type: String,
    },
    presentDistrict: {
      type: String,
    },
    presentThana: {
      type: String,
    },

    // Academic Information
    className: {
      type: String,
      required: true,
    },
    studentClassRoll: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
    },
    section: {
      type: String,
    },
    activeSession: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(StudentStatus),
      default: StudentStatus.ACTIVE,
    },
    studentType: {
      type: String,
      enum: Object.values(StudentType),
    },
    additionalNote: {
      type: String,
    },

    // Fee Information
    admissionFee: {
      type: Number,
      default: 0,
    },
    monthlyFee: {
      type: Number,
      default: 0,
    },
    previousDues: {
      type: Number,
      default: 0,
    },
    sessionFee: {
      type: Number,
      default: 0,
    },
    residenceFee: {
      type: Number,
      default: 0,
    },
    otherFee: {
      type: Number,
      default: 0,
    },
    transportFee: {
      type: Number,
      default: 0,
    },
    boardingFee: {
      type: Number,
      default: 0,
    },

    // Settings
    sendAdmissionSMS: {
      type: Boolean,
      default: false,
    },
    studentSerial: {
      type: String,
    },
    sendAttendanceSMS: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Student = model<IStudent>('Student', studentSchema);
