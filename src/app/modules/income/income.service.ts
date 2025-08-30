import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';

import Redis from 'ioredis';
import { clearIncomeCache } from './income.utils';
import { Income } from './income.model';
import { IIncome } from './income.interface';
import QueryBuilder from '../../builder/QueryBuilder';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: 3,
});

const createIncome = async (payload: IIncome) => {
  const totalAmount = payload.incomeItems.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  const incomeData = {
    ...payload,
    totalAmount,
  };

  const result = await Income.create(incomeData);
  await clearIncomeCache();
  return result;
};
const getAllIncomes = async (query: Record<string, unknown>) => {
  const cacheKey = `incomes:${JSON.stringify(query)}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log('✅ Returning cached incomes data');
      return JSON.parse(cached);
    }
  } catch (err) {
    console.error('Redis read error:', err);
  }
  const queryBuilder = new QueryBuilder(Income.find(), query)
    .search(['description', 'someOtherField'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();

  const incomes = await queryBuilder.modelQuery.populate('category');
  try {
    await redis.setex(cacheKey, 300, JSON.stringify({ meta, incomes }));
    console.log('✅ Cached incomes data');
  } catch (err) {
    console.error('Redis write error:', err);
  }

  return {
    meta,
    incomes,
  };
};

const getSingleIncome = async (id: string) => {
  const cacheKey = `income:${id}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log('✅ Returning cached single income');
      return JSON.parse(cached);
    }
  } catch (err) {
    console.error('Redis read error:', err);
  }

  const income = await Income.findById(id).populate('category');
    await clearIncomeCache();
  if (!income) {
    throw new AppError(httpStatus.NOT_FOUND, 'Income not found');
  }

  try {
    await redis.setex(cacheKey, 300, JSON.stringify(income));
  } catch (err) {
    console.error('Redis write error:', err);
  }

  return income;
};

const updateIncome = async (id: string, payload: Partial<IIncome>) => {
  if (payload.incomeItems && payload.incomeItems.length > 0) {
    payload.totalAmount = payload.incomeItems.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0,
    );
  }

  const income = await Income.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!income) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update income');
  }

  await redis.del(`income:${id}`);
  await clearIncomeCache();

  return income;
};

const deleteIncome = async (id: string) => {
  const income = await Income.findByIdAndDelete(id);
  if (!income) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Income not found or already deleted',
    );
  }
  await redis.del(`income:${id}`);
  await clearIncomeCache();
  return income;
};

const getIncomeTotalsByCategory = async () => {
  const result = await Income.aggregate([
    {
      $lookup: {
        from: "incomecategories",
        localField: "category",
        foreignField: "_id",
        as: "categoryInfo",
      },
    },
    {
      $unwind: {
        path: "$categoryInfo",
        preserveNullAndEmptyArrays: true, // include incomes without category
      },
    },
    {
      $group: {
        _id: "$categoryInfo.name", // group by category name
        totalAmount: { $sum: "$totalAmount" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        categoryName: "$_id",
        totalAmount: 1,
        count: 1,
        _id: 0,
      },
    },
  ]);

  return result;
};

export const incomeServices = {
  createIncome,
  getAllIncomes,
  getSingleIncome,
  updateIncome,
  deleteIncome,
  getIncomeTotalsByCategory,
};


