import { Schema, model } from 'mongoose';
import { IStaff } from './staff.interface';

// Address schema
const addressSchema = new Schema(
  {
    address: String,
    village: String,
    postOffice: String,
    thana: String,
    district: String,
    state: String,
    country: String,
    zipCode: String,
  },
  { _id: false }
);

// Education schema
const educationSchema = new Schema(
  {
    degree: String,
    institution: String,
    year: String,
    specialization: String,
  },
  { _id: false }
);

// Certification schema
const certificationSchema = new Schema(
  {
    certificateName: String,
    issuedBy: String,
    year: String,
    description: String,
  },
  { _id: false }
);

// Work experience schema
const experienceSchema = new Schema(
  {
    organization: String,
    position: String,
    from: String,
    to: String,
    description: String,
  },
  { _id: false }
);

const staffSchema = new Schema<IStaff>(
  {
    // Basic Information
    staffId: {
      type: String,
    },
    staffSerial: {
      type: Number,

    },
    smartIdCard: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
      required:true
    },
    bloodGroup: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required:true
    },
    nationality: {
      type: String,
    },
    religion: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
    staffPhoto: {
      type: String,
    },

    // Address
    permanentAddress: {
      type: addressSchema,
    },
    currentAddress: {
      type: addressSchema,
    },
    sameAsPermanent: {
      type: Boolean,
      default: false,
    },

    // Professional Info
    designation: {
      type: String,
    },
    department: {
      type: String,
    },
    joiningDate: {
      type: Date,
    },
    monthlySalary: {
      type: Number,
    },
    staffType: {
      type: String,

    },

    // Educational Background
    educationalQualifications: {
      type: [educationSchema],
    },
    certifications: {
      type: [certificationSchema],
    },
    workExperience: {
      type: [experienceSchema],
    },

    // Additional Info
    status: {
      type: String,

    },
    language: {
      type: String,

    },
    activeSession: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Staff = model<IStaff>('Staff', staffSchema);
