import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { IAdmission } from './admission.interface';
import { Admission } from './admission.model';

const createAdmission = async (payload: IAdmission) => {
  const result = await Admission.create(payload);
  return result;
};

const getAllAdmissions = async (query: Record<string, unknown>) => {
  const admissionQuery = new QueryBuilder(Admission.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await admissionQuery.countTotal();
  const data = await admissionQuery.modelQuery;

  return {
    meta,
    data,
  };
};

const getSingleAdmission = async (id: string) => {
  const result = await Admission.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission not found');
  }
  return result;
};

const updateAdmission = async (
  id: string,
  payload: Partial<IAdmission>
) => {
  const result = await Admission.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update admission');
  }
  return result;
};

const deleteAdmission = async (id: string) => {
  const result = await Admission.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission not found or already deleted');
  }
  return result;
};

export const admissionService = {
  createAdmission,
  getAllAdmissions,
  getSingleAdmission,
  updateAdmission,
  deleteAdmission,
};
