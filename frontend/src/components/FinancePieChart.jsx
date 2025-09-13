import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useI18n } from "../i18n.jsx";
import { useEffect, useRef, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function FinancePieChart({ income, expenses }) {
  const { t } = useI18n();
  const chartRef = useRef(null);
  const [gradients, setGradients] = useState([]);

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  // group รายจ่ายตาม category
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const hasData = income > 0 || totalExpense > 0;

  // mapping สี category (solid palette)
  const categoryColors = {
    food: "#f59e0b",
    fixed: "#3b82f6",
    debt: "#8b5cf6",
    entertainment: "#ec4899",
    health: "#14b8a6",
    other: "#6b7280"
  };

  // ✅ Gradient colors for Income / Expenses
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      const incomeGradient = ctx.createLinearGradient(0, 0, 0, 200);
      incomeGradient.addColorStop(0, "#4ade80"); // green-400
      incomeGradient.addColorStop(1, "#166534"); // green-800

      const expenseGradient = ctx.createLinearGradient(0, 0, 0, 200);
      expenseGradient.addColorStop(0, "#f87171"); // red-400
      expenseGradient.addColorStop(1, "#7f1d1d"); // red-900

      setGradients([incomeGradient, expenseGradient]);
    }
  }, [income, totalExpense]);

  const labels = hasData
    ? [t.income, t.totalExpenses, ...Object.keys(categoryTotals)]
    : [t.noData];

  const data = {
    labels,
    datasets: [
      {
        data: hasData
          ? [income, totalExpense, ...Object.values(categoryTotals)]
          : [1],
        backgroundColor: hasData
          ? [
              gradients[0] || "#22c55e",
              gradients[1] || "#ef4444",
              ...Object.keys(categoryTotals).map(
                (cat) => categoryColors[cat] || categoryColors.other
              )
            ]
          : ["#9ca3af"],
        borderColor: "#1f2937",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "currentColor",
          font: { size: 12 },
        },
      },
    },
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1200,
      easing: "easeInOutBounce", // 🎉 bounce effect
    },
  };

  return (
    <div className="p-4 h-80">
      <h2 className="text-lg font-bold text-center mb-4">{t.financeSummary}</h2>
      <Doughnut ref={chartRef} data={data} options={options} />
    </div>
  );
}

export default FinancePieChart;
