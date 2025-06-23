export interface IAdmission {
  // Student Information
  studentNameBangla: string;
  fatherNameBangla: string;
  motherNameBangla: string;
  studentName: string;
  mobileNo: string;
  class: string;
  session: string;
  category: "resident" | "non-resident";
  dateOfBirth: Date;
  nidBirth?: string;
  bloodGroup?: string;
  nationality: string;

  // Father's Information
  fatherName: string;
  fatherMobile: string;
  fatherNid?: string;
  fatherProfession?: string;
  fatherIncome?: number;
  fatherEmail?: string;
  fatherFb?: string;

  // Mother's Information
  motherName: string;
  motherMobile?: string;
  motherNid?: string;
  motherProfession?: string;
  motherIncome?: number;
  motherEmail?: string;
  motherFb?: string;

  // Present Address
  presentAddress: {
    village?: string;
    postOffice?: string;
    postCode?: string;
    policeStation?: string;
    district?: string;
  };

  // Permanent Address
  permanentAddress: {
    village?: string;
    postOffice?: string;
    postCode?: string;
    policeStation?: string;
    district?: string;
  };

  // Guardian Information
  guardianInfo: {
    name?: string;
    address?: {
      village?: string;
      postOffice?: string;
      postCode?: string;
      policeStation?: string;
      district?: string;
    };
    profession?: string;
    relation?: string;
    mobile?: string;
  };

  // Local Guardian
  localGuardian: {
    name?: string;
    mobile?: string;
    categoryDesignation?: string;
  };

  // Previous School
  previousSchool: {
    institution?: string;
    address?: {
      village?: string;
      postOffice?: string;
      postCode?: string;
      policeStation?: string;
      district?: string;
    };
  };

  // Documents
  documents: {
    birthCertificate?: boolean;
    transferCertificate?: boolean;
    characterCertificate?: boolean;
    markSheet?: boolean;
    photographs?: boolean;
  };

  // Terms
  termsAccepted: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}
