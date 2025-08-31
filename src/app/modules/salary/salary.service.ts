// src/modules/salary/salary.service.ts

import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import Redis from 'ioredis';
import { Salary } from './salary.model';
import { ISalary } from './salary.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { clearSalaryCache } from './salary.utils';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: 3,
});

const createSalary = async (payload: ISalary) => {
  console.log(payload);
  // Calculate allowances total
  const allowances =
    (payload.houseRent || 0) +
    (payload.medicalAllowance || 0) +
    (payload.transportAllowance || 0) +
    (payload.foodAllowance || 0) +
    (payload.otherAllowances || 0);

  // Calculate deductions total
  const deductions =
    (payload.incomeTax || 0) +
    (payload.providentFund || 0) +
    (payload.otherDeductions || 0);

  // Calculate gross and net salary
  payload.grossSalary = (payload.basicSalary || 0) + allowances;
  payload.netSalary = payload.grossSalary - deductions;

  // Optional: prevent negative net salary here
  if (payload.netSalary < 0) {
    throw new Error("Net salary cannot be negative");
  }

  // Save to DB
  const result = await Salary.create(payload);

  console.log(result)
  await clearSalaryCache();
  return result;
};

const getAllSalaries = async (query: Record<string, unknown>) => {
  const cacheKey = `salaries:${JSON.stringify(query)}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log('✅ Returning cached salaries data');
      return JSON.parse(cached);
    }
  } catch (err) {
    console.error('Redis read error:', err);
  }

  const queryBuilder = new QueryBuilder(Salary.find(), query)
    .search(['notes'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();

  const salaries = await queryBuilder.modelQuery;
  // const salaries = await queryBuilder.modelQuery.populate("employeeId");

  try {
    await redis.setex(cacheKey, 300, JSON.stringify({ meta, salaries }));
    console.log('✅ Cached salaries data');
  } catch (err) {
    console.error('Redis write error:', err);
  }

  return {
    meta,
    salaries,
  };
};

const getSingleSalary = async (id: string) => {
  const cacheKey = `salary:${id}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log('✅ Returning cached single salary');
      return JSON.parse(cached);
    }
  } catch (err) {
    console.error('Redis read error:', err);
  }

  const salary = await Salary.findById(id);
  if (!salary) {
    throw new AppError(httpStatus.NOT_FOUND, 'Salary record not found');
  }

  try {
    await redis.setex(cacheKey, 300, JSON.stringify(salary));
  } catch (err) {
    console.error('Redis write error:', err);
  }

  return salary;
};

const updateSalary = async (id: string, payload: Partial<ISalary>) => {
  if (
    payload.basicSalary !== undefined ||
    payload.houseRent !== undefined ||
    payload.medicalAllowance !== undefined ||
    payload.transportAllowance !== undefined ||
    payload.foodAllowance !== undefined ||
    payload.otherAllowances !== undefined ||
    payload.incomeTax !== undefined ||
    payload.providentFund !== undefined ||
    payload.otherDeductions !== undefined
  ) {
    const allowances =
      (payload.houseRent || 0) +
      (payload.medicalAllowance || 0) +
      (payload.transportAllowance || 0) +
      (payload.foodAllowance || 0) +
      (payload.otherAllowances || 0);

    const deductions =
      (payload.incomeTax || 0) +
      (payload.providentFund || 0) +
      (payload.otherDeductions || 0);

    payload.grossSalary = (payload.basicSalary || 0) + allowances;
    payload.netSalary = payload.grossSalary - deductions;
  }

  const salary = await Salary.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!salary) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update salary record');
  }

  await redis.del(`salary:${id}`);
  await clearSalaryCache();

  return salary;
};

const deleteSalary = async (id: string) => {
  const salary = await Salary.findByIdAndDelete(id);
  if (!salary) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Salary record not found or already deleted',
    );
  }
  await redis.del(`salary:${id}`);
  await clearSalaryCache();
  return salary;
};

export const salaryServices = {
  createSalary,
  getAllSalaries,
  getSingleSalary,
  updateSalary,
  deleteSalary,
};
