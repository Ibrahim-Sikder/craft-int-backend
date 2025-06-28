/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status"
import { incomeServices } from "./income.service"
import sendResponse from "../../../utils/sendResponse"
import { catchAsync } from "../../../utils/catchAsync"

const createIncome = catchAsync(async (req, res, next) => {
  const result = await incomeServices.createIncome(req.body)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Income created successfully",
    data: result,
  })
})

const getAllIncomes = catchAsync(async (req, res, next) => {
  const result = await incomeServices.getAllIncomes(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Incomes retrieved successfully",
    data: result,
  })
})

const getSingleIncome = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const result = await incomeServices.getSingleIncome(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Income retrieved successfully",
    data: result,
  })
})

const updateIncome = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const result = await incomeServices.updateIncome(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Income updated successfully",
    data: result,
  })
})

const deleteIncome = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const result = await incomeServices.deleteIncome(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Income deleted successfully",
    data: result,
  })
})

export const incomeControllers = {
  createIncome,
  getAllIncomes,
  getSingleIncome,
  updateIncome,
  deleteIncome,
}
