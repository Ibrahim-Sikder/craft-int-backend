import { Schema, model } from 'mongoose';
import { ITeacher } from './teacher.interface';

const addressSchema = new Schema(
  {
    address: String,
    village: String,
    postOffice: String,
    thana: String,
    district: String,
    sameAsPermanent: Boolean,
  },
  { _id: false }
);

const certificateSchema = new Schema(
  {
    name: String,
    image: String,
  },
  { _id: false }
);

const teacherSchema = new Schema<ITeacher>(
  {
    teacherId: {
      type: String,
      unique: true,
    },
    teacherSerial: {
      type: Number,
      // required: true,
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
    englishName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    personalPhone: {
      type: String,
    },
    teacherEmail: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    image: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },

    // Address Info
    permanentAddress: {
      type: addressSchema,
      // required: true,
    },
    currentAddress: {
      type: addressSchema,
      // required: true,
    },

    // Professional Info
    professionalInfo: {
      designation: {
        type: String,
      },
      monthlySalary: {
        type: Number,
        default: 0,
      },
      department: {
        type: String,
      },
      staffType: {
        type: String,
        enum: ['Teacher', 'Staff', 'Other'],
        default: 'Teacher',
      },
      joiningDate: {
        type: Date,
      },
      residenceType: {
        type: String,
        enum: ['Residential', 'Non-residential'],
        default: 'Residential',
      },
    },

    // Additional Info
    additionalInfo: {
      guardianPhone: {
        type: String,
      },
      youtubeChannel: {
        type: String,
      },
      facebookProfile: {
        type: String,
      },
      twitterProfile: {
        type: String,
      },
      status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
      },
      language: {
        type: String,
        enum: ['Bangla', 'English', 'Other'],
        default: 'Bangla',
      },
    },

    // Session Info
    sessionInfo: {
      activeSession: {
        type: String,
        required: true,
      },
    },

    // Certificates
    certificates: {
      type: [certificateSchema],
    },
  },
  {
    timestamps: true,
  }
);

export const Teacher = model<ITeacher>('Teacher', teacherSchema);
