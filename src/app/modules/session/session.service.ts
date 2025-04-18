import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { IAcademicSession } from './session.interface';
import { AcademicSession } from './session.model';

const createSession = async (payload: IAcademicSession) => {
  const { sessionName } = payload;

  if (!sessionName) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Session name is required');
  }

  const existing = await AcademicSession.findOne({ sessionName });
  if (existing) {
    throw new AppError(httpStatus.CONFLICT, 'Session already exists');
  }

  const result = await AcademicSession.create(payload);
  return result;
};

const getAllSessions = async () => {
  const result = await AcademicSession.find().sort({ createdAt: -1 });
  const total = await AcademicSession.countDocuments();
  return {
    meta: { total },
    sessions: result,
  };
};

const getSingleSession = async (id: string) => {
  const result = await AcademicSession.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Session not found');
  }
  return result;
};

const updateSession = async (id: string, payload: Partial<IAcademicSession>) => {
  const result = await AcademicSession.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update session');
  }
  return result;
};

const deleteSession = async (id: string) => {
  const result = await AcademicSession.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Session not found or already deleted');
  }
  return result;
};

export const sessionServices = {
  createSession,
  getAllSessions,
  getSingleSession,
  updateSession,
  deleteSession,
};
