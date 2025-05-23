import { Student } from './student.model';

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
  '' = '',
}

export enum StudentStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  GRADUATED = 'Graduated',
}

export enum StudentType {
  RESIDENTIAL = 'Residential',
  DAY = 'Non-residential',
  Care = 'Day-Care',
  '' = '',
}

const findLastStudentNo = async () => {
  const lastStudent = await Student.findOne(
    {},
    {
      studentId: 1,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.studentId ? lastStudent?.studentId : undefined;
};

export const generateStudentId = async () => {
  const currentId = (await findLastStudentNo()) || '0000';
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${incrementId}`;
  return incrementId;
};
