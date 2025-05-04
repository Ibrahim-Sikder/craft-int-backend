/* eslint-disable @typescript-eslint/no-unused-vars */
import { model, Schema } from 'mongoose';
import { IStudent } from './student.interface';
import { Gender, StudentStatus, StudentType } from './student.utils';

const studentSchema = new Schema<IStudent>(
  {
    studentId: {
      type: String,
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
  
    },
    birthDate: {
      type: String,
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

    },
    bloodGroup: {
      type: String,
    },
    studentPhoto: {
      type: String,
    },


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
    permanentAddress: {
      type: String,

    },
    permanentDistrict: {
      type: String,

    },
    permanentThana: {
      type: String,

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

    className: {
      type: [String],

    },
    studentClassRoll: {
      type: String,

    },
    batch: {
      type: String,
    },
    section: {
      type: [String],
    },
    activeSession: {
      type: [String],

    },
    status: {
      type: String,
      // enum: Object.values(StudentStatus),
      // default: StudentStatus.ACTIVE,
    },
    studentType: {
      type: String,
      enum: Object.values(StudentType),
    },
    additionalNote: {
      type: String,
    },


    admissionFee: {
      type: Number,
      default: 0,
    },
    monthlyFee: {
      type: Number,
      default: 0,
    },
    monthlySalary: {
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
