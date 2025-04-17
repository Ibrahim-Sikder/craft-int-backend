import { Teacher } from "./teacher.model";

  const findLastTeacherNo = async () => {
    const lastJobCard = await Teacher.findOne(
      {},
      {
        job_no: 1,
      },
    )
      .sort({ createdAt: -1 })
      .lean();
  
    return lastJobCard?.teacherId ? lastJobCard?.teacherId : undefined;
  };
  
  export const generateTeacherId = async () => {
    const currentId = (await findLastTeacherNo()) || '0000';
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${incrementId}`;
    return incrementId;
  };