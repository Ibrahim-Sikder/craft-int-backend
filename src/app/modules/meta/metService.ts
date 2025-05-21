import { Class } from '../class/class.model';
import { Staff } from '../staff/staff.model';
import { Student } from '../student/student.model';
import { Teacher } from '../teacher/teacher.model';

const getAllMetaFromDB = async () => {
  const [
    totalTeachers,
    totalStudents,
    totalStaffs,
    totalClasses,
    totalMaleStudents,
    totalFemaleStudents,
    totalNonResidentialStudents,
    totalResidentialStudents,
    totalDayCareStudents,
  ] = await Promise.all([
    Teacher.countDocuments(),
    Student.countDocuments(),
    Staff.countDocuments(),
    Class.countDocuments(),
    Student.countDocuments({ gender: 'Male' }),
    Student.countDocuments({ gender: 'Female' }),
    Student.countDocuments({ studentType: 'Non-residential' }),
    Student.countDocuments({ studentType: 'Day-care' }),
    Student.countDocuments({ studentType: 'Residential' }),
  ]);

  return {
    totalTeachers,
    totalStudents,
    totalStaffs,
    totalClasses,
    totalMaleStudents,
    totalFemaleStudents,
    totalNonResidentialStudents,
    totalResidentialStudents,
    totalDayCareStudents
  };
};
export const metaServices = {
  getAllMetaFromDB,
};
