import { Student } from "./student.model";

export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other'
  }
  
  export enum StudentStatus {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
    GRADUATED = 'Graduated'
  }
  
  export enum StudentType {
    RESIDENTIAL = 'Residential',
    DAY = 'Day'
  }
  

  const findLastStudentNo = async () => {
    const lastJobCard = await Student.findOne(
      {},
      {
        job_no: 1,
      },
    )
      .sort({ createdAt: -1 })
      .lean();
  
    return lastJobCard?.studentId ? lastJobCard?.studentId : undefined;
  };
  
  export const generateStudentId = async () => {
    const currentId = (await findLastStudentNo()) || '0000';
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${incrementId}`;
    return incrementId;
  };