import { Teacher } from "./teacher.model";

  const findLastTeacherNo = async () => {
    const lastTeacherNo = await Teacher.findOne(
      {},
      {
        teacherId: 1,
      },
    )
      .sort({ createdAt: -1 })
      .lean();
  
    return lastTeacherNo?.teacherId ? lastTeacherNo?.teacherId : undefined;
  };
  
  export const generateTeacherId = async () => {
    const currentId = (await findLastTeacherNo()) || '0000';
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${incrementId}`;
    return incrementId;
  };