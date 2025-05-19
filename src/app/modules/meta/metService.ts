import { Class } from "../class/class.model";
import { Staff } from "../staff/staff.model";
import { Student } from "../student/student.model";
import { Teacher } from "../teacher/teacher.model";

const getAllMetaFromDB = async () => {
  const [totalTeachers, totalStudents, totalStaffs, totalClasses] = await Promise.all([
    Teacher.countDocuments(),
    Student.countDocuments(), 
    Staff.countDocuments(),
    Class.countDocuments(),
  ]);

  return {
    totalTeachers,
    totalStudents,
    totalStaffs,
    totalClasses,
  };
};

export const metaServices = {
  getAllMetaFromDB,
};
