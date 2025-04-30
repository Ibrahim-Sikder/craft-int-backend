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
    zipCode: String
  },
  { _id: false }
);

// Education qualification schema
const educationSchema = new Schema(
  {
    degree: String,
    institution: String,
    year: String,
    specialization: String
  },
  { _id: false }
);

// Certification schema
const certificationSchema = new Schema(
  {
    name: String,
    issuedBy: String,
    year: String,
    description: String
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
    description: String
  },
  { _id: false }
);

const teacherSchema = new Schema<ITeacher>(
  {
    // Basic Information (Step 1)
    teacherId: {
      type: String,
  
    },
    teacherSerial: {
      type: Number,
      required: true
    },
    smartIdCard: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Date
    },
    bloodGroup: {
      type: String
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true
    },
    nationality: {
      type: String
    },
    religion: {
      type: String
    },
    maritalStatus: {
      type: String,
      enum: ['Single', 'Married', 'Divorced', 'Widowed']
    },
    teacherPhoto: {
      type: String // For storing image path/URL
    },

    // Address Information (Step 2)
    permanentAddress: {
      type: addressSchema,
      required: true
    },
    currentAddress: {
      type: addressSchema
    },
    sameAsPermanent: {
      type: Boolean,
      default: false
    },

    // Professional Information (Step 3)
    designation: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    joiningDate: {
      type: Date,
      required: true
    },
    monthlySalary: {
      type: Number,
      required: true
    },
    staffType: {
      type: String,
      enum: ['Teacher', 'Staff', 'Other'],
      required: true
    },

    // Educational Information (Step 4)
    educationalQualifications: {
      type: [educationSchema]
    },
    certifications: {
      type: [certificationSchema]
    },
    workExperience: {
      type: [experienceSchema]
    },

    // Additional Information (Step 5)
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
      required: true
    },
    language: {
      type: String,
      enum: ['Bangla', 'English', 'Other']
    },
    activeSession: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export const Teacher = model<ITeacher>('Teacher', teacherSchema);