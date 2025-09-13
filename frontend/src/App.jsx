import { useState, useEffect } from "react";
import IncomeInput from "./components/IncomeInput";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import DashboardSummary from "./components/DashboardSummary";
import FinancePieChart from "./components/FinancePieChart";
import Navbar from "./components/Navbar";

function App() {
  const [income, setIncome] = useState(0);
  const [target, setTarget] = useState(0);
  const [expenses, setExpenses] = useState([]);

  // โหลดค่าจาก localStorage
  useEffect(() => {
    const savedIncome = localStorage.getItem("income");
    const savedTarget = localStorage.getItem("target");
    const savedExpenses = localStorage.getItem("expenses");

    if (savedIncome) setIncome(Number(savedIncome));
    if (savedTarget) setTarget(Number(savedTarget));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  // บันทึกลง localStorage
  useEffect(() => localStorage.setItem("income", income), [income]);
  useEffect(() => localStorage.setItem("target", target), [target]);
  useEffect(
    () => localStorage.setItem("expenses", JSON.stringify(expenses)),
    [expenses]
  );

  const addExpense = (expense) => setExpenses([...expenses, expense]);

  const handleReset = () => {
    localStorage.clear();
    setIncome(0);
    setTarget(0);
    setExpenses([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-blue-600 dark:text-blue-400">
          Personal Finance Dashboard
        </h1>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column: Inputs */}
          <div className="flex flex-col gap-6">
            {/* Income + Target */}
            <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
                Set Goals
              </h2>
              <IncomeInput setIncome={setIncome} setTarget={setTarget} />
            </div>

            {/* Add Expense */}
            <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
                Add Expense
              </h2>
              <ExpenseForm onAddExpense={addExpense} />
            </div>
          </div>

          {/* Right Column: Summary + Chart */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
            {/* Dashboard Summary */}
            <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <DashboardSummary
                income={income}
                expenses={expenses}
                target={target}
              />
            </div>

            {/* Pie Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <FinancePieChart income={income} expenses={expenses} />
            </div>
          </div>
        </div>

        {/* Expense Table */}
        <div className="mt-10 bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-2xl shadow-md hover:shadow-lg transition overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Expense History
          </h2>
          <ExpenseTable expenses={expenses} />
        </div>

        {/* Reset Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-3 rounded-lg shadow-md transition text-base sm:text-lg font-medium"
          >
            Reset Data
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
