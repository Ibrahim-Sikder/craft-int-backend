import { Schema, model } from 'mongoose';
import { ITeacher } from './teacher.interface';

// Address schema structure that matches both permanent and present address forms
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
  { _id: false },
);

// Education qualification schema
const educationSchema = new Schema(
  {
    degree: String,
    institution: String,
    year: String,
    specialization: String,
  },
  { _id: false },
);

// Certification schema
const certificationSchema = new Schema(
  {
    certificateName: String,
    issuedBy: String,
    year: String,
    description: String,
  },
  { _id: false },
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
  { _id: false },
);

const teacherSchema = new Schema<ITeacher>(
  {
    // Basic Information (Step 1)
    teacherId: {
      type: String,
    },
    teacherSerial: {
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
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    bloodGroup: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
      default: 'Male',
    },
    nationality: {
      type: String,
    },
    religion: {
      type: String,
    },
    maritalStatus: {
      type: String,
      enum: ['Single', 'Married', 'Divorced', 'Widowed'],
      default: 'Single',
    },
    teacherPhoto: {
      type: String, 
    },

    permanentAddress: {
      type: addressSchema,
      required: true,
    },
    currentAddress: {
      type: addressSchema,
    },
    sameAsPermanent: {
      type: Boolean,
      default: false,
    },

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
      // enum: ['Teacher', 'Staff', 'Other'],
      // default:'Teacher'

    },

    // Educational Information (Step 4)
    educationalQualifications: {
      type: [educationSchema],
    },
    certifications: {
      type: [certificationSchema],
    },
    workExperience: {
      type: [experienceSchema],
    },

    // Additional Information (Step 5)
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    language: {
      type: String,
      // enum: ['Bangla', 'English', 'Other'],
      // default: 'Bangla',
    },
    activeSession: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Teacher = model<ITeacher>('Teacher', teacherSchema);
