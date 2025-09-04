import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import Redis from 'ioredis';
import { clearExpenseCache } from './expense.utils';
import { Expense } from './expense.model';
import { IExpense } from './expense.interface';
import QueryBuilder from '../../builder/QueryBuilder';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: 3,
});

const createExpense = async (payload: IExpense) => {
  const totalAmount = payload.expenseItems.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  const expenseData = {
    ...payload,
    totalAmount,
  };

  const result = await Expense.create(expenseData);
  await clearExpenseCache();
  return result;
};

const getAllExpenses = async (query: Record<string, unknown>) => {
  const cacheKey = `expenses:${JSON.stringify(query)}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log('✅ Returning cached expenses data');
      return JSON.parse(cached);
    }
  } catch (err) {
    console.error('Redis read error:', err);
  }

  const queryBuilder = new QueryBuilder(Expense.find(), query)
    .search(['description', 'someOtherField'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();
  const expenses = await queryBuilder.modelQuery.populate('category');

  try {
    await redis.setex(cacheKey, 300, JSON.stringify({ meta, expenses }));
    console.log('✅ Cached expenses data');
  } catch (err) {
    console.error('Redis write error:', err);
  }

  return { meta, expenses };
};

const getSingleExpense = async (id: string) => {
  const cacheKey = `expense:${id}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log('✅ Returning cached single expense');
      return JSON.parse(cached);
    }
  } catch (err) {
    console.error('Redis read error:', err);
  }

  const expense = await Expense.findById(id).populate('category');
  await clearExpenseCache();
  if (!expense) {
    throw new AppError(httpStatus.NOT_FOUND, 'Expense not found');
  }

  try {
    await redis.setex(cacheKey, 300, JSON.stringify(expense));
  } catch (err) {
    console.error('Redis write error:', err);
  }

  return expense;
};

const updateExpense = async (id: string, payload: Partial<IExpense>) => {
  if (payload.expenseItems && payload.expenseItems.length > 0) {
    payload.totalAmount = payload.expenseItems.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0,
    );
  }

  const expense = await Expense.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!expense) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update expense');
  }

  await redis.del(`expense:${id}`);
  await clearExpenseCache();

  return expense;
};

const deleteExpense = async (id: string) => {
  const expense = await Expense.findByIdAndDelete(id);
  if (!expense) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Expense not found or already deleted',
    );
  }
  await redis.del(`expense:${id}`);
  await clearExpenseCache();
  return expense;
};

const getExpenseTotalsByCategory = async () => {
  const result = await Expense.aggregate([
    {
      $lookup: {
        from: "expensecategories",
        localField: "category",
        foreignField: "_id",
        as: "categoryInfo",
      },
    },
    {
      $unwind: {
        path: "$categoryInfo",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$categoryInfo.name",
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
  ])

  return result
}

export const expenseServices = {
  createExpense,
  getAllExpenses,
  getSingleExpense,
  updateExpense,
  deleteExpense,
  getExpenseTotalsByCategory
};
