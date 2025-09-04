import { model, Schema } from 'mongoose';
import { IAdmission } from './admission.interface';

// admission.model.ts
const AdmissionSchema: Schema = new Schema<IAdmission>(
  {
    // Student Information
    studentNameBangla: { type: String, required: true },
    fatherNameBangla: { type: String, required: true },
    motherNameBangla: { type: String, required: true },
    studentName: { type: String, required: true },
    mobileNo: { type: String, required: true },
    class: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    paymentStatus: { type: String, required: true },
    admissionFee: { type: Number },
    monthlyFee: { type: Number },
    session: { type: String, required: true },
    category: {
      type: String,
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

    // Mother's Information
    motherName: { type: String, required: true },
    motherMobile: { type: String },
    motherNid: { type: String },
    motherProfession: { type: String },
    motherIncome: { type: Number },

    // Addresses
    presentAddress: {
      village: { type: String, required: true },
      postOffice: { type: String, required: true },
      postCode: { type: String, required: true },
      policeStation: { type: String, required: true },
      district: { type: String, required: true },
    },
    permanentAddress: {
      village: { type: String, required: true },
      postOffice: { type: String, required: true },
      postCode: { type: String, required: true },
      policeStation: { type: String, required: true },
      district: { type: String, required: true },
    },

    // Guardian Information
    guardianInfo: {
      name: { type: String, required: true },
      relation: { type: String, required: true },
      mobile: { type: String, required: true },
      address: { type: String, required: true },
    },

    // Previous School
    previousSchool: {
      institution: { type: String, required: true },
      address: { type: String, required: true },
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
    timestamps: true,
  },
);

export const Admission = model<IAdmission>('Admission', AdmissionSchema);
