import { model, Schema } from 'mongoose';
import { IAdmission } from './admission.interface';

const AdmissionSchema: Schema = new Schema<IAdmission>({
  // Student Information
  studentNameBangla: { type: String, required: true },
  fatherNameBangla: { type: String, required: true },
  motherNameBangla: { type: String, required: true },
  studentName: { type: String, required: true },
  mobileNo: { type: String, required: true },
  class: { type: String, required: true },
  session: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['resident', 'non-resident'] 
  },
  dateOfBirth: { type: Date, required: true },
  nidBirth: { type: String },
  bloodGroup: { type: String },
  nationality: { type: String, required: true },

  // Father's Information
  fatherName: { type: String, required: true },
  fatherMobile: { type: String, required: true },
  fatherNid: { type: String },
  fatherProfession: { type: String },
  fatherIncome: { type: Number },
  fatherEmail: { type: String },
  fatherFb: { type: String },

  // Mother's Information
  motherName: { type: String, required: true },
  motherMobile: { type: String },
  motherNid: { type: String },
  motherProfession: { type: String },
  motherIncome: { type: Number },
  motherEmail: { type: String },
  motherFb: { type: String },

  // Addresses
  presentAddress: {
    village: { type: String },
    postOffice: { type: String },
    postCode: { type: String },
    policeStation: { type: String },
    district: { type: String },
  },
  permanentAddress: {
    village: { type: String },
    postOffice: { type: String },
    postCode: { type: String },
    policeStation: { type: String },
    district: { type: String },
  },

  // Guardian Information
  guardianInfo: {
    name: { type: String },
    address: {
      village: { type: String },
      postOffice: { type: String },
      postCode: { type: String },
      policeStation: { type: String },
      district: { type: String },
    },
    profession: { type: String },
    relation: { type: String },
    mobile: { type: String },
  },

  // Local Guardian
  localGuardian: {
    name: { type: String },
    mobile: { type: String },
    categoryDesignation: { type: String },
  },

  // Previous School
  previousSchool: {
    institution: { type: String },
    address: {
      village: { type: String },
      postOffice: { type: String },
      postCode: { type: String },
      policeStation: { type: String },
      district: { type: String },
    },
  },

  // Documents
  documents: {
    birthCertificate: { type: Boolean, default: false },
    transferCertificate: { type: Boolean, default: false },
    characterCertificate: { type: Boolean, default: false },
    markSheet: { type: Boolean, default: false },
    photographs: { type: Boolean, default: false },
  },

  // Terms
  termsAccepted: { type: Boolean, required: true },
}, 
{
  timestamps: true
});


export const Admission = model<IAdmission>('Admission', AdmissionSchema);
