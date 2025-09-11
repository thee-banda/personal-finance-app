import IncomeInput from './components/IncomeInput'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import DashboardSummary from './components/DashboardSummary'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">💰 Personal Finance App</h1>
      
      {/* ช่องกรอกรายรับ */}
      <IncomeInput />

      {/* ฟอร์มเพิ่มรายจ่าย */}
      <ExpenseForm />

      {/* ตารางรายจ่าย */}
      <ExpenseTable />

      {/* สรุปผล */}
      <DashboardSummary />
    </div>
  )
}

export default App
