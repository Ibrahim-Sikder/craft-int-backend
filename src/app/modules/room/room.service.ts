import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { IRoom } from './room.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { roomSearchableFields } from './room.constant';
import { Room } from './room.model';

const createRoom = async (payload: IRoom) => {
  const { name, description, capacity } = payload;

  if (!name || !description || !capacity) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Required fields are missing');
  }

  const existingRoom = await Room.findOne({ name });
  if (existingRoom) {
    throw new AppError(httpStatus.CONFLICT, 'Room with this number already exists');
  }

  const result = await Room.create(payload);
  return result;
};

const getAllRooms = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(Room.find(), query)
    .search(roomSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();
  const rooms = await queryBuilder.modelQuery;

  return {
    meta,
    rooms,
  };
};

const getSingleRoom = async (id: string) => {
  const result = await Room.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found');
  }
  return result;
};

const updateRoom = async (id: string, payload: Partial<IRoom>) => {
  const result = await Room.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update room');
  }
  return result;
};

const deleteRoom = async (id: string) => {
  const result = await Room.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found or already deleted');
  }
  return result;
};

export const roomServices = {
  createRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};
