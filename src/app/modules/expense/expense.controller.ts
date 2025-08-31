/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { expenseServices } from "./expense.service";
import sendResponse from "../../../utils/sendResponse";
import { catchAsync } from "../../../utils/catchAsync";

const createExpense = catchAsync(async (req, res, next) => {
  const result = await expenseServices.createExpense(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Expense created successfully",
    data: result,
  });
});

const getAllExpenses = catchAsync(async (req, res, next) => {
  const result = await expenseServices.getAllExpenses(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Expenses retrieved successfully",
    data: result,
  });
});

const getSingleExpense = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await expenseServices.getSingleExpense(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Expense retrieved successfully",
    data: result,
  });
});

const updateExpense = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await expenseServices.updateExpense(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Expense updated successfully",
    data: result,
  });
});

const deleteExpense = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await expenseServices.deleteExpense(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Expense deleted successfully",
    data: result,
  });
});

export const expenseControllers = {
  createExpense,
  getAllExpenses,
  getSingleExpense,
  updateExpense,
  deleteExpense,
};
