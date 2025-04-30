import { Document } from 'mongoose';
import { Gender, StudentStatus, StudentType } from './student.utils';


export enum Designation {
  CHAIRMAN = 'Chairman',
  TEACHER = 'Teacher',
  COOK = 'Cook',
}
export interface IStudent extends Document {
  studentId: string;
  smartIdCard: string;
  name: string;
  email: string;
  birthDate: string;
  birthRegistrationNo: string;
  gender: Gender;
  mobile: string;
  bloodGroup: string;
  studentPhoto: string;

  // Family Information
  fatherName: string;
  motherName: string;
  guardianName: string;
  guardianMobile: string;
  relation: string;
  nidFatherMotherGuardian: string;

  // Address Information
  permanentAddress: string;
  permanentDistrict: string;
  permanentThana: string;
  sameAsPermanent: boolean;
  presentAddress: string;
  presentDistrict: string;
  presentThana: string;

  // Academic Information
  className: string;
  studentClassRoll: string;
  batch: string;
  section: string;
  activeSession: string;
  status: StudentStatus;
  studentType: StudentType;
  additionalNote: string;

  // Fee Information
  admissionFee: number;
  monthlyFee: number;
  previousDues: number;
  sessionFee: number;
  residenceFee: number;
  otherFee: number;
  transportFee: number;
  boardingFee: number;
  monthlySalary: number;

  // Settings
  sendAdmissionSMS: boolean;
  studentSerial: string;
  sendAttendanceSMS: boolean;
}
