import { useState, useEffect } from "react";
import IncomeInput from "../components/IncomeInput";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import DashboardSummary from "../components/DashboardSummary";
import FinancePieChart from "../components/FinancePieChart";
import Navbar from "../components/Navbar";

function App() {
  const [income, setIncome] = useState(0);
  const [target, setTarget] = useState(0);
  const [expenses, setExpenses] = useState([]);

  // โหลดค่าจาก localStorage ตอน mount
  useEffect(() => {
    const savedIncome = localStorage.getItem("income");
    const savedTarget = localStorage.getItem("target");
    const savedExpenses = localStorage.getItem("expenses");

    if (savedIncome) setIncome(Number(savedIncome));
    if (savedTarget) setTarget(Number(savedTarget));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  // บันทึก income ลง localStorage
  useEffect(() => {
    localStorage.setItem("income", income);
  }, [income]);

  // บันทึก target ลง localStorage
  useEffect(() => {
    localStorage.setItem("target", target);
  }, [target]);

  // บันทึก expenses ลง localStorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };
  const handleReset = () => {
    localStorage.clear();
    setIncome(0);
    setTarget(0);
    setExpenses([]);
  };


  return (
  <div className="min-h-screen bg-gray-100">
    {/* Navbar */}
    <Navbar />

    {/* Main content */}
    <div className="flex justify-center">
      <div className="w-full max-w-3xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Personal Finance App
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <IncomeInput setIncome={setIncome} setTarget={setTarget} />
            <ExpenseForm onAddExpense={addExpense} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <DashboardSummary
              income={income}
              expenses={expenses}
              target={target}
            />
            <FinancePieChart income={income} expenses={expenses} />
          </div>
          <div className="bg-white p-4 rounded shadow md:col-span-2">
            <ExpenseTable expenses={expenses} />
          </div>
          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            Reset Data
          </button>
        </div>
      </div>
    </div>
  </div>
);

}

export default App;
