import { Complaint } from './complaint.model';
import { IComplaint } from './complaint.interface';
import { AppError } from '../../error/AppError';
import httpStatus from 'http-status';

const createComplaint = async (payload: IComplaint) => {
  return await Complaint.create(payload);
};

const getAllComplaints = async () => {
  return await Complaint.find();
};

const getSingleComplaint = async (id: string) => {
  const result = await Complaint.findById(id);
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Complaint not found');
  return result;
};

const updateComplaint = async (id: string, payload: Partial<IComplaint>) => {
  const result = await Complaint.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Failed to update complaint');
  return result;
};

const deleteComplaint = async (id: string) => {
  const result = await Complaint.findByIdAndDelete(id);
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Complaint not found');
  return result;
};

export const complaintServices = {
  createComplaint,
  getAllComplaints,
  getSingleComplaint,
  updateComplaint,
  deleteComplaint,
};
