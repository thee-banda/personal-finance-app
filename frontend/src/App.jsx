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

  // history stacks
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

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

  const saveHistory = () => {
    setHistory((prev) => [
      ...prev,
      { income, target, expenses: [...expenses] }, // ✅ clone expenses
    ]);
    setRedoStack([]); // reset redo เมื่อมีการเปลี่ยนใหม่
  };

  const addExpense = (expense) => {
    saveHistory();
    setExpenses([...expenses, expense]);
  };

  const handleReset = () => {
    saveHistory();
    localStorage.clear();
    setIncome(0);
    setTarget(0);
    setExpenses([]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const lastState = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [
      ...prev,
      { income, target, expenses: [...expenses] },
    ]);

    setIncome(lastState.income);
    setTarget(lastState.target);
    setExpenses(lastState.expenses);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const lastRedo = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setHistory((prev) => [
      ...prev,
      { income, target, expenses: [...expenses] },
    ]);

    setIncome(lastRedo.income);
    setTarget(lastRedo.target);
    setExpenses(lastRedo.expenses);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-12 text-blue-600 dark:text-blue-400">
          Personal Finance Dashboard
        </h1>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Inputs */}
          <div className="col-span-1 flex flex-col gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
                Set Goals
              </h2>
              <IncomeInput setIncome={setIncome} setTarget={setTarget} />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
                Add Expense
              </h2>
              <ExpenseForm onAddExpense={addExpense} />
            </div>
          </div>

          {/* Right Column: Summary + Chart รวมกัน */}
          <div className="col-span-2">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Summary (ซ้าย) */}
                <div>
                  <DashboardSummary
                    income={income}
                    expenses={expenses}
                    target={target}
                  />
                </div>

                {/* Chart (ขวา) */}
                <div>
                  <FinancePieChart income={income} expenses={expenses} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expense Table + Action Buttons รวมกัน */}
        <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Expense History
          </h2>
          <ExpenseTable expenses={expenses} />

          {/* Action Buttons (อยู่ในการ์ดเดียวกัน) */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button
              onClick={handleUndo}
              disabled={history.length === 0}
              className="px-6 py-2 rounded-lg font-medium shadow-md transition
                       bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white"
            >
              ⬅️ Undo
            </button>

            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              className="px-6 py-2 rounded-lg font-medium shadow-md transition
                       bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white"
            >
              Redo ➡️
            </button>

            <button
              onClick={handleReset}
              className="px-6 py-2 rounded-lg font-medium shadow-md transition
                       bg-red-500 hover:bg-red-600 text-white"
            >
              Reset Data
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
