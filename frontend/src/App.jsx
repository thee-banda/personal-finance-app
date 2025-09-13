import { useState, useEffect } from "react";
import IncomeForm from "./components/IncomeForm";
import IncomeTable from "./components/IncomeTable";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import DashboardSummary from "./components/DashboardSummary";
import Navbar from "./components/Navbar";
import ToggleCard from "./components/ToggleCard";
import { useI18n } from "./i18n.jsx";

function App() {
  const { t } = useI18n();
  const [income, setIncome] = useState(0);
  const [target, setTarget] = useState(0);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [mode, setMode] = useState("");

  // ✅ state สำหรับ show/hide
  const [showOptions, setShowOptions] = useState({
    summary: true,
    pie: true,
    incomeHistory: true,
    expenseHistory: true,
  });

  const toggleOption = (key) => {
    setShowOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // โหลดค่าจาก localStorage
  useEffect(() => {
    const savedIncome = localStorage.getItem("income");
    const savedTarget = localStorage.getItem("target");
    const savedIncomes = localStorage.getItem("incomes");
    const savedExpenses = localStorage.getItem("expenses");

    if (savedIncome) setIncome(Number(savedIncome));
    if (savedTarget) setTarget(Number(savedTarget));
    if (savedIncomes) setIncomes(JSON.parse(savedIncomes));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  // บันทึกลง localStorage
  useEffect(() => localStorage.setItem("income", income), [income]);
  useEffect(() => localStorage.setItem("target", target), [target]);
  useEffect(() => localStorage.setItem("incomes", JSON.stringify(incomes)), [incomes]);
  useEffect(() => localStorage.setItem("expenses", JSON.stringify(expenses)), [expenses]);

  const saveHistory = () => {
    setHistory((prev) => [
      ...prev,
      { income, target, incomes: [...incomes], expenses: [...expenses] },
    ]);
    setRedoStack([]);
  };

  // --- Income handlers ---
  const addIncome = (incomeItem) => {
    saveHistory();
    const updated = [...incomes, incomeItem];
    setIncomes(updated);
    setIncome(updated.reduce((sum, e) => sum + e.amount, 0));
  };

  const editIncome = (index, updatedIncome) => {
    saveHistory();
    const updated = incomes.map((e, i) => (i === index ? updatedIncome : e));
    setIncomes(updated);
    setIncome(updated.reduce((sum, e) => sum + e.amount, 0));
  };

  const deleteIncome = (index) => {
    saveHistory();
    const updated = incomes.filter((_, i) => i !== index);
    setIncomes(updated);
    setIncome(updated.reduce((sum, e) => sum + e.amount, 0));
  };

  // --- Expense handlers ---
  const addExpense = (expense) => {
    saveHistory();
    setExpenses([...expenses, expense]);
  };

  const editExpense = (index, updatedExpense) => {
    saveHistory();
    const updated = expenses.map((e, i) => (i === index ? updatedExpense : e));
    setExpenses(updated);
  };

  const deleteExpense = (index) => {
    saveHistory();
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
  };

  // --- Reset / Undo / Redo ---
  const handleReset = () => {
    if (!window.confirm("คุณแน่ใจหรือไม่ที่จะรีเซ็ตข้อมูลทั้งหมด?")) return;
    saveHistory();
    localStorage.clear();
    setIncome(0);
    setTarget(0);
    setIncomes([]);
    setExpenses([]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const lastState = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [
      ...prev,
      { income, target, incomes: [...incomes], expenses: [...expenses] },
    ]);

    setIncome(lastState.income);
    setTarget(lastState.target);
    setIncomes(lastState.incomes);
    setExpenses(lastState.expenses);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const lastRedo = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setHistory((prev) => [
      ...prev,
      { income, target, incomes: [...incomes], expenses: [...expenses] },
    ]);

    setIncome(lastRedo.income);
    setTarget(lastRedo.target);
    setIncomes(lastRedo.incomes);
    setExpenses(lastRedo.expenses);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-12 text-blue-600 dark:text-blue-400">
          Personal Finance Dashboard
        </h1>
        {/* ✅ Checkbox Controls */}
        <div className="mb-5">
          <h2 className="font-semibold mb-3">Show / Hide Sections</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { key: "summary", label: "Finance Summary" },
              { key: "incomeHistory", label: "Income History" },
              { key: "expenseHistory", label: "Expense History" },
            ].map((opt) => (
              <ToggleCard
                key={opt.key}
                label={opt.label}
                checked={showOptions[opt.key]}
                onChange={() => toggleOption(opt.key)}
              />
            ))}
          </div>
        </div>

        {/* Dropdown เลือกโหมด */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-6">
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
            {t.selectMode}
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 
                       bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                       focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t.selectPlaceholder}</option>
            <option value="income">{t.income}</option>
            <option value="expense">{t.expense}</option>
          </select>
          {/* Grid layout */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Inputs */}
          <div className="col-span-1 flex flex-col gap-6">
            {mode === "income" && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
                  Add Income
                </h2>
                <IncomeForm onAddIncome={addIncome} />
              </div>
            )}

            {mode === "expense" && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
                  Add Expense
                </h2>
                <ExpenseForm onAddExpense={addExpense} />
              </div>
            )}
          </div>
        </div>
        </div>

        

        
        


        

        {/* Income Table */}
        {showOptions.incomeHistory && (
          <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
              Income History
            </h2>
            <IncomeTable
              incomes={incomes}
              onDeleteIncome={deleteIncome}
              onEditIncome={editIncome}
            />
          </div>
        )}

        {/* Expense Table */}
        {showOptions.expenseHistory && (
          <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
              Expense History
            </h2>
            <ExpenseTable
              expenses={expenses}
              onDeleteExpense={deleteExpense}
              onEditExpense={editExpense}
            />

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={handleUndo}
                disabled={history.length === 0}
                className="px-6 py-2 rounded-lg font-medium shadow-md transition
                           bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white"
              >
                ⬅️ Undo
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-2 rounded-lg font-medium shadow-md transition
                           bg-red-500 hover:bg-red-600 text-white"
              >
                Reset Data
              </button>
              <button
                onClick={handleRedo}
                disabled={redoStack.length === 0}
                className="px-6 py-2 rounded-lg font-medium shadow-md transition
                           bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white"
              >
                Redo ➡️
              </button>
            </div>
          </div>
        )}
        {/* ✅ Dashboard Summary Card */}
        {showOptions.summary && (
          <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-6 text-gray-700 dark:text-gray-200">
              {t.financeSummary}
            </h2>
            <DashboardSummary
              income={income}
              expenses={expenses}
              target={target}
              showSummary={showOptions.summary}
              showPie={true}  // 🔹 ตอนนี้ pie chart ถูกบังคับเปิดใน summary อยู่แล้ว
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
