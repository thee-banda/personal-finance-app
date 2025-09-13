import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useI18n } from "../i18n.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

function FinancePieChart({ income, expenses }) {
  const { t } = useI18n();

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  // group รายจ่ายตาม category
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const hasData = income > 0 || totalExpense > 0;

  // mapping สี category
  const categoryColors = {
    food: "#f59e0b",
    fixed: "#3b82f6",
    debt: "#8b5cf6",
    entertainment: "#ec4899",
    health: "#14b8a6",
    other: "#6b7280"
  };

  const labels = hasData
    ? [t.income, t.totalExpenses, ...Object.keys(categoryTotals)]
    : [t.noData];

  const data = {
    labels,
    datasets: [
      {
        data: hasData
          ? [income, totalExpense, ...Object.values(categoryTotals)]
          : [1], // ค่า dummy ถ้าไม่มีข้อมูล
        backgroundColor: hasData
          ? [
              "#22c55e", // income
              "#ef4444", // total expenses
              ...Object.keys(categoryTotals).map(
                (cat) => categoryColors[cat] || "#9ca3af"
              )
            ]
          : ["#9ca3af"], // เทา ถ้าไม่มีข้อมูล
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-center mb-2">{t.financeSummary}</h2>
      <Doughnut data={data} />
    </div>
  );
}

export default FinancePieChart;
