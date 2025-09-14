import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useI18n } from "../i18n.jsx";
import { useEffect, useRef, useState } from "react";
// ...existing code...

ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardSummary({ income, expenses, target, showSummary = true, showPie = true }) {
  const { t } = useI18n();
  // ...existing code...
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
    ? [t.income, t.totalExpenses, ...expenses.map((e) => e.desc)]
    : [t.noData];

  const data = {
    labels,
    datasets: [
      {
        data: hasData
          ? [income, totalExpense, ...expenses.map((e) => e.amount)]
          : [1],
        backgroundColor: hasData
          ? [
              gradients[0] || "#22c55e", // income
              gradients[1] || "#ef4444", // expense
              ...expenses.map((e) => e.color || "#3b82f6"), // ✅ ใช้สีจาก expenses
            ]
          : ["#9ca3af"],
  borderColor: "#1f2937",
        borderWidth: 2,
        hoverBackgroundColor: hasData
          ? [
              gradients[0] || "#16a34a", // income - darker on hover
              gradients[1] || "#dc2626", // expense - darker on hover
              ...expenses.map((e) => e.color || "#2563eb"), // ✅ darker colors on hover
            ]
          : ["#6b7280"],
  hoverBorderColor: "#374151",
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    onHover: (event, activeElements) => {
      event.native.target.style.cursor = activeElements.length > 0 ? "pointer" : "default";
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#e5e7eb",
          font: {
            size: 12,
            weight: "500",
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
  backgroundColor: "#1f2937",
  titleColor: "#e5e7eb",
  bodyColor: "#e5e7eb",
  borderColor: "#374151",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value.toLocaleString()} ${t.currency} (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1500,
      easing: "easeInOutQuart",
    },
    cutout: "60%",
    radius: "80%",
    hover: {
      animationDuration: 300,
    },
    elements: {
      arc: {
        borderWidth: 2,
  borderColor: "#1f2937",
        hoverBorderWidth: 3,
  hoverBorderColor: "#374151",
      },
    },
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 sm:gap-8">
      {/* 🔹 Text Summary */}
      {showSummary && (
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Income Card */}
            <div className="bg-gradient-to-br from-green-900/80 via-gray-900/80 to-green-700/80 border border-green-400 rounded-2xl p-4 shadow-2xl backdrop-blur-md bg-opacity-80">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-400 animate-pulse rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white text-lg sm:text-xl">💰</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-green-300 font-medium truncate">{t.income}</p>
                  <p className="text-lg sm:text-xl font-bold text-green-400 drop-shadow-neon-green truncate">
                    {income.toLocaleString()} {t.currency}
                  </p>
                </div>
              </div>
            </div>

            {/* Expenses Card */}
            <div className="bg-gradient-to-br from-pink-900/80 via-gray-900/80 to-pink-700/80 border border-pink-400 rounded-2xl p-4 shadow-2xl backdrop-blur-md bg-opacity-80">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-400 animate-pulse rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white text-lg sm:text-xl">💸</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-pink-300 font-medium truncate">{t.totalExpenses}</p>
                  <p className="text-lg sm:text-xl font-bold text-pink-400 drop-shadow-neon-pink truncate">
                    {totalExpense.toLocaleString()} {t.currency}
                  </p>
                </div>
              </div>
            </div>

            {/* Balance Card */}
            <div className="bg-gradient-to-br from-cyan-900/80 via-gray-900/80 to-cyan-700/80 border border-cyan-400 rounded-2xl p-4 shadow-2xl backdrop-blur-md bg-opacity-80">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${balance >= 0 ? "bg-cyan-400 animate-pulse" : "bg-red-500 animate-pulse"} rounded-lg flex items-center justify-center shadow-md`}>
                  <span className="text-white text-lg sm:text-xl">{balance >= 0 ? "📈" : "📉"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-cyan-300 font-medium truncate">{t.balance}</p>
                  <p className={`text-lg sm:text-xl font-bold ${balance >= 0 ? "text-cyan-400 drop-shadow-neon-cyan" : "text-red-400 drop-shadow-neon-pink"} truncate`}>
                    {balance.toLocaleString()} {t.currency}
                  </p>
                </div>
              </div>
            </div>

            {/* Success Rate Card */}
            <div className="bg-gradient-to-br from-blue-900/80 via-gray-900/80 to-blue-700/80 border border-blue-400 rounded-2xl p-4 shadow-2xl backdrop-blur-md bg-opacity-80">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-400 animate-pulse rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white text-lg sm:text-xl">🎯</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-blue-300 font-medium truncate">{t.successChance}</p>
                  <p className={`text-lg sm:text-xl font-bold ${successPercent >= 80 ? "text-green-400 drop-shadow-neon-green" : "text-orange-400 drop-shadow-neon-orange"} truncate`}>
                    {successPercent}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Pie Chart */}
      {showPie && (
        <div className="flex-1 w-full">
          <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-blue-900/80 border-2 border-blue-500 rounded-full p-6 shadow-2xl backdrop-blur-md bg-opacity-80 flex items-center justify-center relative group">
            <div className="absolute inset-0 rounded-full pointer-events-none group-hover:shadow-[0_0_40px_10px_rgba(59,130,246,0.5)] transition-all duration-300"></div>
            <div className="text-center mb-4 sm:mb-6">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
              </div>
            </div>

            <div className="relative h-64 sm:h-72 lg:h-80 w-full flex items-center justify-center">
              <div className="transition-transform duration-300 group-hover:scale-105">
                <Doughnut
                  key={JSON.stringify(data)}
                  ref={chartRef}
                  data={data}
                  options={options}
                />
              </div>
            </div>

            {/* Chart Legend Enhancement */}
            {hasData && (
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-400">{t.income}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-gray-400">{t.totalExpenses}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardSummary;
