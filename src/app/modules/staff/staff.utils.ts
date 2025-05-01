import { Staff } from './staff.model';

const findLastStaffNo = async () => {
  const lastStaffNo = await Staff.findOne(
    {},
    {
      staffId: 1,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStaffNo?.staffId ? lastStaffNo.staffId : undefined;
};

export const generateStaffId = async () => {
  const currentId = (await findLastStaffNo()) || '0000';
  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  return `${incrementId}`;
};
