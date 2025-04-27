export interface ITeacher {
  teacherId?: string;
  teacherSerial: number | null;
  smartIdCard?: string;
  name: string;
  englishName: string;
  gender: 'Male' | 'Female' | 'Other';
  phone?: string;
  teacherEmail?: string;
  bloodGroup?: string;
  image?: string;
  dateOfBirth?: string;
email:string;
  permanentAddress: {
    address?: string;
    village?: string;
    postOffice?: string;
    thana?: string;
    district?: string;
  };

  currentAddress: {
    address?: string;
    village?: string;
    postOffice?: string;
    thana?: string;
    district?: string;
    sameAsPermanent?: boolean;
  };

  professionalInfo: {
    designation?: string;
    monthlySalary: number | null ;
    department?: string;
    staffType: 'Teacher' | 'Staff' | 'Other';
    joiningDate?: string;
    residenceType: 'Residential' | 'Non-residential';
  };

  additionalInfo?: {
    guardianPhone?: string;
    youtubeChannel?: string;
    facebookProfile?: string;
    twitterProfile?: string;
    status: 'Active' | 'Inactive';
    language: 'Bangla' | 'English' | 'Other';
  };

  sessionInfo: {
    activeSession: string;
  };

  certificates?: {
    name: string;
    image?: string;
  }[];
}
