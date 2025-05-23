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

export interface IStaff {
  // Basic Information
  staffId: string;
  staffSerial: number;
  smartIdCard: string;
  name: string;
  phone: string;
  email: string;
  dateOfBirth?: Date;
  bloodGroup?: string;
  gender: 'Male' | 'Female' | 'Other';
  nationality?: string;
  religion?: string;
  maritalStatus?: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  staffPhoto?: string;

  // Address Information
  permanentAddress: IAddress;
  currentAddress?: IAddress;
  sameAsPermanent?: boolean;

  // Professional Information
  designation: string;
  department: string;
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

  // System fields
  createdAt?: Date;
  updatedAt?: Date;
}
