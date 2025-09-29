import { Types } from 'mongoose';

export interface IAddress {
  address?: string;
  village?: string;
  postOffice?: string;
  thana?: string;
  district?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export interface IEducation {
  degree: string;
  institution: string;
  year: string;
  specialization?: string;
}

export interface ICertification {
  certificateName: string;
  issuedBy: string;
  year: string;
  description?: string;
}

export interface IExperience {
  organization: string;
  position: string;
  from: string;
  to: string;
  description?: string;
}

export interface ITeacher {
  // Basic Information
  teacherId: string;
  teacherSerial: number;
  smartIdCard: string;
  name: string;
  phone: string;
  email: string;
  dateOfBirth?: Date;
  bloodGroup?: string;
  gender: string;
  nationality?: string;
  religion?: string;
  maritalStatus?: string;
  teacherPhoto?: string;
  resumeDoc: string;
  certificateDoc: string;
  nationalIdDoc: string;
  // Address Information
  permanentAddress: IAddress;
  currentAddress?: IAddress;
  sameAsPermanent?: boolean;

  // Professional Information
  designation: string;
  department: string;
  teacherDepartment: string;
  joiningDate: Date;
  monthlySalary: number;
  staffType: 'Teacher' | 'Staff' | 'Other';

  // Educational Information
  educationalQualifications?: IEducation[];
  certifications?: ICertification[];
  workExperience?: IExperience[];

  // Additional Information
  status: 'Active' | 'Inactive';
  language?: 'Bangla' | 'English' | 'Other';
  activeSession?: string;
  section: Types.ObjectId;
  class: Types.ObjectId;
  schedule: Types.ObjectId;
  assignment: Types.ObjectId;
  attendance: Types.ObjectId;
  room: Types.ObjectId;
  // System fields
  createdAt?: Date;
  updatedAt?: Date;
}
