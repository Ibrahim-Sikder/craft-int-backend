import { Class } from '../class/class.model';
import { Income } from '../income/income.model';
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

  const income = await Income.find()
  const totalIncomeAmount = income.reduce((sum, item) => sum + item.totalAmount, 0);
const totalIncomeAmountBD = totalIncomeAmount.toLocaleString('bn-BD')

  return {
    totalTeachers,
    totalStudents,
    totalStaffs,
    totalClasses,
    totalMaleStudents,
    totalFemaleStudents,
    totalNonResidentialStudents,
    totalResidentialStudents,
    totalDayCareStudents,
     totalIncomeAmount:totalIncomeAmountBD,
  };
};
export const metaServices = {
  getAllMetaFromDB,
};
