import { useState } from "react";
import IncomeInput from "../components/IncomeInput";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import DashboardSummary from "../components/DashboardSummary";


function App() {
  const [income, setIncome] = useState(0);
  const [target, setTarget] = useState(0);
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-3xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Personal Finance App
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <IncomeInput onSetIncome={setIncome} />
            <ExpenseForm onAddExpense={addExpense} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <DashboardSummary income={income} expenses={expenses} target={target} />
          </div>
          <div className="bg-white p-4 rounded shadow md:col-span-2">
            <ExpenseTable expenses={expenses} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
