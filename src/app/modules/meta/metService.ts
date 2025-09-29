import { Admission } from '../admission/admission.model';
import { Class } from '../class/class.model';
import { Expense } from '../expense/expense.model';
import { Income } from '../income/income.model';
import { Investment } from '../investment/model';
import { Loan } from '../loan/model';
import { Salary } from '../salary/salary.model';
import { Staff } from '../staff/staff.model';
import { Student } from '../student/student.model';
import { Teacher } from '../teacher/teacher.model';

const getAllMetaFromDB = async () => {
  const [
    totalTeachers,
    totalStudents,
    totalStaffs,
    totalClasses,
    totalMaleStudents,
    totalFemaleStudents,
    totalNonResidentialStudents,
    totalResidentialStudents,
    totalDayCareStudents,
  ] = await Promise.all([
    Teacher.countDocuments(),
    Student.countDocuments(),
    Staff.countDocuments(),
    Class.countDocuments(),
    Student.countDocuments({ gender: 'Male' }),
    Student.countDocuments({ gender: 'Female' }),
    Student.countDocuments({ studentType: 'Non-residential' }),
    Student.countDocuments({ studentType: 'Day-care' }),
    Student.countDocuments({ studentType: 'Residential' }),
  ]);

  const income = await Income.find();
  const totalIncomeAmount = income.reduce(
    (sum, item) => sum + item.totalAmount,
    0,
  );
  const totalIncomeAmountBD = totalIncomeAmount.toLocaleString('bn-BD');

  return {
    totalTeachers,
    totalStudents,
    totalStaffs,
    totalClasses,
    totalMaleStudents,
    totalFemaleStudents,
    totalNonResidentialStudents,
    totalResidentialStudents,
    totalDayCareStudents,
    totalIncomeAmount: totalIncomeAmountBD,
  };
};

// const getAccountingReport = async () => {
//   const [investments, expenses, incomes, salaries, loans, admissions] = await Promise.all([
//     Investment.find(),
//     Expense.find(),
//     Income.find(),
//     Salary.find(),
//     Loan.find(),
//     Admission.find(),
//   ]);

//   // Income & Expense
//   const totalIncome = incomes.reduce((sum, inc) => sum + (inc.totalAmount || 0), 0);
//   const totalExpense = expenses.reduce((sum, exp) => sum + (exp.totalAmount || 0), 0);
//   const totalSalary = salaries.reduce((sum, sal) => sum + (sal.netSalary || 0), 0);
//   const totalAdmissionFee = admissions.reduce((sum, adm) => sum + (adm.admissionFee || 0), 0);

//   // Loans
//   const totalTakenLoan = loans
//     .filter(l => l.loan_type === "taken")
//     .reduce((sum, l) => sum + (l.loan_amount || 0), 0);

//   const totalGivenLoan = loans
//     .filter(l => l.loan_type === "given")
//     .reduce((sum, l) => sum + (l.loan_amount || 0), 0);

//   // Investment
//   const totalInvestment = investments.reduce((sum, inv) => sum + (inv.investmentAmount || 0), 0);

//   // Net Profit (আয় - ব্যয় - বেতন + ভর্তি ফি)
//   const netProfit = totalIncome + totalAdmissionFee - totalExpense - totalSalary;

//   // Accounting Equation
//   const assets = totalInvestment + totalGivenLoan + (netProfit > 0 ? netProfit : 0);
//   const liabilities = totalTakenLoan;
//   const equity = totalInvestment + netProfit;

//   return {
//     summary: {
//       assets,        // সম্পদ
//       liabilities,   // দেনা
//       equity,        // মূলধন
//       income: totalIncome + totalAdmissionFee,
//       expense: totalExpense + totalSalary,
//     },
//     breakdown: {
//       totalIncome,
//       totalAdmissionFee,
//       totalExpense,
//       totalSalary,
//       totalInvestment,
//       totalTakenLoan,
//       totalGivenLoan,
//       netProfit,
//     },
//     formulaCheck: {
//       "Assets (সম্পদ)": assets,
//       "Liabilities (দেনা)": liabilities,
//       "Equity (মূলধন)": equity,
//       "Equation": `${assets} = ${liabilities} + ${equity}`,
//       "Valid?": assets === liabilities + equity,
//     },
//   };
// };

const getAccountingReport = async () => {
  const [investments, expenses, incomes, salaries, loans, admissions] =
    await Promise.all([
      Investment.find(),
      Expense.find(),
      Income.find(),
      Salary.find(),
      Loan.find(),
      Admission.find(),
    ]);

  // ✅ Income & Expense
  const totalIncome = incomes.reduce(
    (sum, inc) => sum + (inc.totalAmount || 0),
    0,
  );
  const totalExpense = expenses.reduce(
    (sum, exp) => sum + (exp.totalAmount || 0),
    0,
  );
  const totalSalary = salaries.reduce(
    (sum, sal) => sum + (sal.netSalary || 0),
    0,
  );
  const totalAdmissionFee = admissions.reduce(
    (sum, adm) => sum + (adm.admissionFee || 0),
    0,
  );

  // ✅ Loans
  const takenLoans = loans.filter((l) => l.loan_type === "taken");
  const givenLoans = loans.filter((l) => l.loan_type === "given");

  const totalTakenLoan = takenLoans.reduce(
    (sum, l) => sum + (l.loan_amount || 0),
    0,
  );
  const totalGivenLoan = givenLoans.reduce(
    (sum, l) => sum + (l.loan_amount || 0),
    0,
  );

  // ✅ Outstanding loans calculation
  const outstandingTakenLoans = takenLoans.reduce(
    (sum, l) => sum + (l.remainingBalance ?? l.loan_amount),
    0,
  );
  const outstandingGivenLoans = givenLoans.reduce(
    (sum, l) => sum + (l.remainingBalance ?? l.loan_amount),
    0,
  );

  // ✅ Investments
  const outgoingInvestments = investments.filter(
    (inv) => inv.investmentCategory === "outgoing",
  );
  const incomingInvestments = investments.filter(
    (inv) => inv.investmentCategory === "incoming",
  );

  const totalOutgoingInvestment = outgoingInvestments.reduce(
    (sum, inv) => sum + (inv.investmentAmount || 0),
    0,
  );
  const totalIncomingInvestment = incomingInvestments.reduce(
    (sum, inv) => sum + (inv.investmentAmount || 0),
    0,
  );

  // ✅ Net Profit
  const netProfit =
    totalIncome + totalAdmissionFee - (totalExpense + totalSalary);

  // ✅ Cash Balance
  const cashBalance =
    totalIncome +
    totalAdmissionFee +
    totalTakenLoan +
    totalIncomingInvestment -
    (totalExpense + totalSalary + totalOutgoingInvestment + totalGivenLoan);

  // ✅ Assets
  const assets = {
    cash: Math.max(0, cashBalance),
    accountsReceivable: outstandingGivenLoans, // given loan (asset)
    investments: outgoingInvestments.reduce(
      (sum, inv) => sum + (inv.currentValue || inv.investmentAmount),
      0,
    ),
    fixedAssets: 0, // future: building, furniture etc
    total: function () {
      return (
        this.cash +
        this.accountsReceivable +
        this.investments +
        this.fixedAssets
      );
    },
  };

  // ✅ Liabilities (⚠️ fixed: no double counting)
  const liabilities = {
    loans: outstandingTakenLoans, // শুধু নেওয়া loan রাখলাম
    accountsPayable: 0, // vendor payable থাকলে এখানে যোগ করবেন
    otherLiabilities: 0,
    total: function () {
      return this.loans + this.accountsPayable + this.otherLiabilities;
    },
  };

  // ✅ Equity
  const equity = {
    capital: totalIncomingInvestment, // যদি মালিক/শেয়ারহোল্ডারের টাকা হয়
    retainedEarnings: netProfit,
    total: function () {
      return this.capital + this.retainedEarnings;
    },
  };

  // ✅ Equation Check
  const isBalanced = assets.total() === liabilities.total() + equity.total();

  return {
    success: true,
    message: "Accounting report fetched successfully.",
    data: {
      summary: {
        assets: assets.total(),
        liabilities: liabilities.total(),
        equity: equity.total(),
        income: totalIncome + totalAdmissionFee,
        expense: totalExpense + totalSalary,
        netProfit,
      },
      breakdown: {
        totalIncome,
        totalAdmissionFee,
        totalExpense,
        totalSalary,
        totalOutgoingInvestment,
        totalIncomingInvestment,
        totalTakenLoan,
        totalGivenLoan,
        outstandingTakenLoans,
        outstandingGivenLoans,
      },
      details: {
        assets,
        liabilities,
        equity,
      },
      formulaCheck: {
        "Assets (সম্পদ)": assets.total(),
        "Liabilities (দেনা)": liabilities.total(),
        "Equity (মূলধন)": equity.total(),
        Equation: `Assets (${assets.total()}) = Liabilities (${liabilities.total()}) + Equity (${equity.total()})`,
        "Valid?": isBalanced,
        Difference:
          assets.total() - (liabilities.total() + equity.total()),
      },
    },
  };
};

export const metaServices = {
  getAllMetaFromDB,
  getAccountingReport,
};
