import { useState, useEffect } from "react";
import IncomeForm from "./components/IncomeForm";
import IncomeTable from "./components/IncomeTable";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import TransactionTable from "./components/TransactionTable";
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
    if (savedIncomes) setIncomes(JSON.parse(savedIncomes) || []);
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses) || []);
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
    const item = {
      ...incomeItem,
      id: Date.now(),
      type: "income",
    };
    const updated = [...incomes, item];
    setIncomes(updated);
    setIncome(updated.reduce((sum, e) => sum + e.amount, 0));
  };

  const editIncome = (id, updatedIncome) => {
    saveHistory();
    const updated = incomes.map((e) => (e.id === id ? { ...e, ...updatedIncome } : e));
    setIncomes(updated);
    setIncome(updated.reduce((sum, e) => sum + e.amount, 0));
  };

  const deleteIncome = (id) => {
    saveHistory();
    const updated = incomes.filter((e) => e.id !== id);
    setIncomes(updated);
    setIncome(updated.reduce((sum, e) => sum + e.amount, 0));
  };

  // --- Expense handlers ---
  const addExpense = (expenseItem) => {
    saveHistory();
    const item = {
      ...expenseItem,
      id: Date.now(),
      type: "expense",
      color: expenseItem.color || "#8884d8", // ✅ default color
    };
    setExpenses((prev) => [...prev, item]);
  };

  const editExpense = (id, updatedExpense) => {
    saveHistory();
    const updated = expenses.map((e) => (e.id === id ? { ...e, ...updatedExpense } : e));
    setExpenses(updated);
  };

  const deleteExpense = (id) => {
    saveHistory();
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
  };

  // --- Reset / Undo / Redo ---
  const handleReset = () => {
    if (!window.confirm(t.confirmReset)) return;
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

  // ✅ รวมรายรับ + รายจ่าย เรียงตามเวลาที่ submit
  const transactions = [
    ...(Array.isArray(incomes) ? incomes : []),
    ...(Array.isArray(expenses) ? expenses : []),
  ].sort((a, b) => a.id - b.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-12 text-blue-600 dark:text-blue-400">
          {t.dashboardTitle}
        </h1>

        {/* ✅ Checkbox Controls */}
        <div className="mb-5">
          <h2 className="font-semibold mb-3">{t.showHideSections}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[{ key: "summary", label: "financeSummary" }].map((opt) => (
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
          <div className="mt-5">
            {mode === "income" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Income Form */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition h-fit">
                  <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
                    {t.addIncome}
                  </h2>
                  <IncomeForm onAddIncome={addIncome} />
                </div>

                {/* Income History */}
                {showOptions.incomeHistory && (
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
                      {t.incomeHistory}
                    </h2>
                    <div className="h-[500px] overflow-y-auto">
                      <IncomeTable
                        incomes={incomes}
                        onDeleteIncome={deleteIncome}
                        onEditIncome={editIncome}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {mode === "expense" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Expense Form */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                  <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
                    {t.addExpense}
                  </h2>
                  <ExpenseForm onAddExpense={addExpense} />
                </div>

                {/* Expense History */}
                {showOptions.expenseHistory && (
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
                      {t.expenseHistory}
                    </h2>
                    <div className="h-[500px] overflow-y-auto">
                      <ExpenseTable
                        expenses={expenses}
                        onDeleteExpense={deleteExpense}
                        onEditExpense={editExpense}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ✅ Transaction Table รวม */}
        <TransactionTable
          transactions={transactions}
          onDelete={(tx) => {
            if (tx.type === "income") {
              deleteIncome(tx.id);
            } else {
              deleteExpense(tx.id);
            }
          }}
          onEdit={(tx) => {
            if (tx.type === "income") {
              editIncome(tx.id, tx);
            } else {
              editExpense(tx.id, tx);
            }
          }}
        />

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
              showPie={true}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
