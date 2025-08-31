import { ObjectId } from 'mongoose';

export interface IAddress {
  village: string;
  postOffice: string;
  postCode: string;
  policeStation: string;
  district: string;
}

export interface IGuardianInfo {
  name: string;
  relation: string;
  mobile: string;
  address: string;
}

export interface IPreviousSchool {
  institution: string;
  address: string;
}

export interface IDocuments {
  birthCertificate: boolean;
  transferCertificate: boolean;
  characterCertificate: boolean;
  markSheet: boolean;
  photographs: boolean;
}

export interface IAdmission {
  // Student Information
  studentNameBangla: string;
  fatherNameBangla: string;
  motherNameBangla: string;
  studentName: string;
  mobileNo: string;
  class: ObjectId;
  session: string;
  category: 'resident' | 'non-resident';
  dateOfBirth: Date;
  nidBirth?: string;
  bloodGroup?: string;
  nationality: string;

  // Parent Information
  fatherName: string;
  fatherMobile: string;
  fatherNid?: string;
  fatherProfession?: string;
  fatherIncome?: number;

  motherName: string;
  motherMobile?: string;
  motherNid?: string;
  motherProfession?: string;
  motherIncome?: number;

  // Addresses
  presentAddress: IAddress;
  permanentAddress: IAddress;

  // Guardian Information
  guardianInfo: IGuardianInfo;

  // Previous School
  previousSchool: IPreviousSchool;

  // Documents
  documents: IDocuments;

  // Terms
  termsAccepted: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}
