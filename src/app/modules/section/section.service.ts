import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { ISection } from './section.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { sectionSearchableFields } from './section.constant'; 
import { Section } from './section.model';

const createSection = async (payload: ISection) => {
  const { name, classes, sectionType } = payload;

  if (!name || !classes || sectionType === undefined) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Required fields are missing');
  }

  const existingSection = await Section.findOne({ name, classes });
  if (existingSection) {
    throw new AppError(httpStatus.CONFLICT, 'Section with this name already exists in this class');
  }

  const result = await Section.create(payload);
  return result;
};

const getAllSections = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(Section.find(), query)
    .search(sectionSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();
  const sections = await queryBuilder.modelQuery.populate(['classes', 'teachers', 'rooms', 'timeSlots']);

  return {
    meta,
    sections,
  };
};

const getSingleSection = async (id: string) => {
  const result = await Section.findById(id).populate(['classes', 'teachers', 'rooms', 'timeSlots']);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Section not found');
  }
  return result;
};

const updateSection = async (id: string, payload: Partial<ISection>) => {
  const result = await Section.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update section');
  }
  return result;
};

const deleteSection = async (id: string) => {
  const result = await Section.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Section not found or already deleted');
  }
  return result;
};

export const sectionServices = {
  createSection,
  getAllSections,
  getSingleSection,
  updateSection,
  deleteSection,
};
