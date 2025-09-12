import { useState } from "react";
import IncomeInput from "../components/IncomeInput";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import DashboardSummary from "../components/DashboardSummary";

function DashboardPage() {
  const [income, setIncome] = useState(0);
  const [target, setTarget] = useState(6000);
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => setExpenses([...expenses, expense]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📊 Dashboard</h2>
      <IncomeInput onSetIncome={setIncome} />
      <ExpenseForm onAddExpense={addExpense} />
      <ExpenseTable expenses={expenses} />
      <DashboardSummary income={income} expenses={expenses} target={target} />  
    </div>
  );
}

export default DashboardPage;
