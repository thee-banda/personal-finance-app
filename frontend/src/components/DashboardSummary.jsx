import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useI18n } from "../i18n.jsx";
import { useEffect, useRef, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardSummary({ income, expenses, target, showSummary = true, showPie = true }) {
  const { t } = useI18n();
  const chartRef = useRef(null);
  const [gradients, setGradients] = useState([]);

  // ✅ คำนวณค่าหลัก
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = income - totalExpense;
  const successPercent = target
    ? Math.min(100, ((balance / target) * 100).toFixed(0))
    : 0;

  // ✅ group รายจ่ายตาม category
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const hasData = income > 0 || totalExpense > 0;

  // 🎨 generate palette
  function generateHueWheel(count = 7) {
    return Array.from({ length: count }, (_, i) => {
      const hue = (i * (360 / count)) % 360;
      return `hsl(${hue}, 70%, 55%)`;
    });
  }
  const palette = generateHueWheel(Object.keys(categoryTotals).length);

  // ✅ Gradient income / expense
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      const incomeGradient = ctx.createLinearGradient(0, 0, 0, 200);
      incomeGradient.addColorStop(0, "#4ade80");
      incomeGradient.addColorStop(1, "#166534");

      const expenseGradient = ctx.createLinearGradient(0, 0, 0, 200);
      expenseGradient.addColorStop(0, "#f87171");
      expenseGradient.addColorStop(1, "#7f1d1d");

      setGradients([incomeGradient, expenseGradient]);
    }
  }, [income, totalExpense]);

  // ✅ chart data
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
              gradients[0] || "#22c55e", // income
              gradients[1] || "#ef4444", // expense
              ...palette,
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
      easing: "easeInOutBounce",
    },
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8">
      {/* 🔹 Text Summary */}
      {showSummary && (
        <div className="flex-1 text-center space-y-2">
          <p className="text-gray-700 dark:text-gray-200 font-medium">
            {t.income}:{" "}
            <span className="font-semibold text-green-600 dark:text-green-400">
              {income} {t.currency}
            </span>
          </p>
          <p className="text-gray-700 dark:text-gray-200 font-medium">
            {t.totalExpenses}:{" "}
            <span className="font-semibold text-red-600 dark:text-red-400">
              {totalExpense} {t.currency}
            </span>
          </p>
          <p
            className={`font-medium ${
              balance >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {t.balance}:{" "}
            <span className="font-semibold">
              {balance} {t.currency}
            </span>
          </p>
          <p className="text-gray-700 dark:text-gray-200 font-medium">
            {t.successChance}:{" "}
            <span
              className={`font-bold ${
                successPercent >= 80
                  ? "text-green-600 dark:text-green-400"
                  : "text-orange-500 dark:text-orange-400"
              }`}
            >
              {successPercent}%
            </span>
          </p>
        </div>
      )}

      {/* 🔹 Pie Chart */}
      {showPie && (
        <div className="flex-1 h-80 w-full">
          <h2 className="text-lg font-bold text-center mb-4">
            {t.financeSummary}
          </h2>
          <Doughnut ref={chartRef} data={data} options={options} />
        </div>
      )}
    </div>
  );
}

export default DashboardSummary;
