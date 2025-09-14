import { useState, useEffect } from "react";
import IncomeForm from "./components/IncomeForm";
import IncomeTable from "./components/IncomeTable";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import DashboardSummary from "./components/DashboardSummary";
import TransactionTable from "./components/TransactionTable";
// Removed theme-related imports
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
  // Removed theme settings modal state
    expenseHistory: true,
  });

  // ...existing code...

  const toggleOption = (key) => {
    setShowOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // โหลดค่าจาก localStorage (safe parse)
  useEffect(() => {
    try {
      const savedIncome = localStorage.getItem("income");
      const savedTarget = localStorage.getItem("target");
      const savedIncomes = localStorage.getItem("incomes");
      const savedExpenses = localStorage.getItem("expenses");

      if (savedIncome) setIncome(Number(savedIncome));
      if (savedTarget) setTarget(Number(savedTarget));
      if (savedIncomes) setIncomes(JSON.parse(savedIncomes) || []);
      if (savedExpenses) setExpenses(JSON.parse(savedExpenses) || []);
    } catch (err) {
      console.error("Error loading from localStorage", err);
      setIncomes([]);
      setExpenses([]);
    }
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
      createdAt: new Date().toISOString(),
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
      createdAt: new Date().toISOString(),
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
  ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // ...existing code...

  // ToggleCard options
  const optionList = [
    { key: "summary", label: t.financeSummary },
    { key: "incomeHistory", label: t.incomeHistory },
    { key: "expenseHistory", label: t.expenseHistory },
  ];

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex flex-col">
      <Navbar />

  <main className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16 bg-gray-900/80 rounded-2xl shadow-2xl backdrop-blur-md flex-1">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-10 lg:mb-14 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 drop-shadow-lg">
          {t.appTitle}
        </h1>

        {/* ✅ Checkbox Controls */}
        <div className="mb-4 sm:mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">



          </div>
        </div>

        {/* Dropdown เลือกโหมด */}
        <div className="bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md mb-4 sm:mb-6">
          <label className="block mb-2 font-semibold text-gray-100 text-sm sm:text-base">
            {t.selectMode}
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 text-gray-100 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">{t.selectPlaceholder}</option>
            <option value="income">{t.income}</option>
            <option value="expense">{t.expense}</option>
          </select>

          {/* Grid layout */}
          <div className="mt-4 sm:mt-5">
            {mode === "income" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Income Form */}
                <div className="bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition h-fit">
                  <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-100">
                    {t.addIncome}
                  </h2>
                  <IncomeForm onAddIncome={addIncome} />
                </div>

                {/* Income History */}
                {showOptions.incomeHistory && (
                  <div className="bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-100">
                      {t.incomeHistory}
                    </h2>
                    <div className="h-[400px] sm:h-[500px] overflow-y-auto">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Expense Form */}
                <div className="bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition">
                  <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-100">
                    {t.addExpense}
                  </h2>
                  <ExpenseForm onAddExpense={addExpense} />
                </div>

                {/* Expense History */}
                {showOptions.expenseHistory && (
                  <div className="bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-100">
                      {t.expenseHistory}
                    </h2>
                    <div className="h-[400px] sm:h-[500px] overflow-y-auto">
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
          <div className="mt-8 sm:mt-10 lg:mt-12 bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-100">
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

  <Footer />
    </div>
  );
}

export default App;
