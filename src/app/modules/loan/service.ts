// loan/services.ts
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { Loan } from './model';
import { TLoan, TRepaymentHistory } from './interface';

const createLoan = async (payload: TLoan) => {
  const result = await Loan.create(payload);
  return result;
};

const getAllLoans = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(Loan.find(), query)
    .search(['lenderName', 'borrowerName'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();
  const data = await queryBuilder.modelQuery;

  return { meta, data };
};

const getSingleLoan = async (id: string) => {
  const result = await Loan.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Loan not found');
  }
  return result;
};

const updateLoan = async (id: string, payload: Partial<TLoan>) => {
  const result = await Loan.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update loan');
  }
  return result;
};

const deleteLoan = async (id: string) => {
  const result = await Loan.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Loan not found or already deleted',
    );
  }
  return result;
};

const addRepayment = async (id: string, repaymentData: TRepaymentHistory) => {

  const loan = await Loan.findById(id);
  if (!loan) {
    throw new AppError(httpStatus.NOT_FOUND, 'Loan not found');
  }
  console.log('loan', loan);
  const remainingBefore = loan.remainingBalance;

  if (repaymentData.amount > loan.remainingBalance) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Repayment amount exceeds remaining balance',
    );
  }
  repaymentData.remainingBalance =
    remainingBefore -
    (repaymentData.type === 'principal' ? repaymentData.amount : 0);

  loan.repaymentHistory.push(repaymentData);
  await loan.save();
  return loan;
};

const transferLoan = async (
  originalLoanId: string,
  newLoanData: Partial<TLoan>,
) => {
  // Get the original loan
  const originalLoan = await Loan.findById(originalLoanId);
  if (!originalLoan || originalLoan.loan_type !== 'taken') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid original loan');
  }

  if (originalLoan.remainingBalance <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Original loan has no remaining balance to transfer',
    );
  }

  // Create a new loan given
  const newLoan = await Loan.create({
    ...newLoanData,
    loan_type: 'given',
    loan_amount: originalLoan.remainingBalance,
    originalLoan: originalLoanId,
  });

  // Initialize fundedLoans if it doesn't exist
  if (!originalLoan.fundedLoans) {
    originalLoan.fundedLoans = [];
  }

  // Update original loan to reference this new loan
  originalLoan.fundedLoans.push(newLoan._id);
  await originalLoan.save();

  return newLoan;
};

const calculateLoanAmortization = async (id: string) => {
  const loan = await Loan.findById(id);
  if (!loan) throw new AppError(httpStatus.NOT_FOUND, "Loan not found");

  if (!loan.repayment_start_date || !loan.repayment_end_date || !loan.interest_rate) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Missing required fields for amortization calculation"
    );
  }

  const amortizationSchedule = [];
  let balance = loan.loan_amount;
  const monthlyRate = loan.interest_rate / 100 / 12;

  // Ensure repayment_end_date is after repayment_start_date
  const start = loan.repayment_start_date;
  const end = loan.repayment_end_date > start ? loan.repayment_end_date : start;

  const months = Math.ceil((end.getTime() - start.getTime()) / (30 * 24 * 60 * 60 * 1000));
console.log('month check this  ',months)
  if (months <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Repayment end date must be after start date");
  }

  const monthlyPayment =
    loan.monthly_installment ||
    (loan.loan_amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

  for (let i = 0; i < months; i++) {
    const paymentDate = new Date(start);
    paymentDate.setMonth(paymentDate.getMonth() + i);

    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;

    if (balance < principal) {
      amortizationSchedule.push({
        date: paymentDate,
        payment: balance + interest,
        principal: balance,
        interest,
        balance: 0,
      });
      break;
    }

    balance -= principal;

    amortizationSchedule.push({
      date: paymentDate,
      payment: monthlyPayment,
      principal,
      interest,
      balance,
    });
  }

  return {
    amortizationSchedule,
    totalInterest: amortizationSchedule.reduce((sum, p) => sum + p.interest, 0),
    totalPayment: amortizationSchedule.reduce((sum, p) => sum + p.payment, 0),
  };
};


export const loanServices = {
  createLoan,
  getAllLoans,
  getSingleLoan,
  updateLoan,
  deleteLoan,
  addRepayment,
  transferLoan,
  calculateLoanAmortization,
};
