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
      borderColor: document.documentElement.classList.contains('dark') ? "#1f2937" : "#ffffff",
      borderWidth: 2,
      hoverBackgroundColor: hasData
        ? [
            gradients[0] || "#16a34a", // income - darker on hover
            gradients[1] || "#dc2626", // expense - darker on hover
            ...expenses.map((e) => e.color || "#2563eb"), // ✅ darker colors on hover
          ]
        : ["#6b7280"],
      hoverBorderColor: document.documentElement.classList.contains('dark') ? "#374151" : "#e5e7eb",
      hoverBorderWidth: 3,
    },
  ],
};

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    onHover: (event, activeElements) => {
      event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
          font: { 
            size: 12,
            weight: '500'
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle'
        },
      },
      tooltip: {
        backgroundColor: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
        titleColor: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
        bodyColor: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
        borderColor: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value.toLocaleString()} ${t.currency} (${percentage}%)`;
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1500,
      easing: "easeInOutQuart",
    },
    cutout: '60%',
    radius: '80%',
    hover: {
      animationDuration: 300,
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
        hoverBorderWidth: 3,
        hoverBorderColor: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb',
      }
    },
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 sm:gap-8">
      {/* 🔹 Text Summary */}
      {showSummary && (
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Income Card */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 
                           border border-green-200 dark:border-green-700 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white text-lg sm:text-xl">💰</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium truncate">{t.income}</p>
                  <p className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400 truncate">
                    {income.toLocaleString()} {t.currency}
                  </p>
                </div>
              </div>
            </div>

            {/* Expenses Card */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 
                           border border-red-200 dark:border-red-700 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white text-lg sm:text-xl">💸</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium truncate">{t.totalExpenses}</p>
                  <p className="text-lg sm:text-xl font-bold text-red-600 dark:text-red-400 truncate">
                    {totalExpense.toLocaleString()} {t.currency}
                  </p>
                </div>
              </div>
            </div>

            {/* Balance Card */}
            <div className={`bg-gradient-to-br ${balance >= 0 
              ? 'from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-700' 
              : 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700'
            } border rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-200`}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${balance >= 0 ? 'bg-emerald-500' : 'bg-red-500'} rounded-lg flex items-center justify-center shadow-sm`}>
                  <span className="text-white text-lg sm:text-xl">{balance >= 0 ? '📈' : '📉'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium truncate">{t.balance}</p>
                  <p className={`text-lg sm:text-xl font-bold ${balance >= 0 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-red-600 dark:text-red-400'
                  } truncate`}>
                    {balance.toLocaleString()} {t.currency}
                  </p>
                </div>
              </div>
            </div>

            {/* Success Rate Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 
                           border border-blue-200 dark:border-blue-700 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white text-lg sm:text-xl">🎯</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium truncate">{t.successChance}</p>
                  <p className={`text-lg sm:text-xl font-bold ${successPercent >= 80
                      ? "text-green-600 dark:text-green-400"
                      : "text-orange-500 dark:text-orange-400"
                    } truncate`}>
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
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-800/20 
                         border border-blue-200 dark:border-blue-700 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="text-center mb-4 sm:mb-6">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white text-sm sm:text-lg">📊</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-700 dark:text-gray-200">
                  {t.financeSummary}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Visual breakdown of your financial data
              </p>
            </div>
            
            <div className="relative h-64 sm:h-72 lg:h-80 w-full">
              <Doughnut
                key={JSON.stringify(data)} // ✅ บังคับ re-render เมื่อ data เปลี่ยน
                ref={chartRef}
                data={data}
                options={options}
              />
            </div>
            
            {/* Chart Legend Enhancement */}
            {hasData && (
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-blue-200 dark:border-blue-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                    <span className="text-gray-600 dark:text-gray-400">{t.income}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-600"></div>
                    <span className="text-gray-600 dark:text-gray-400">{t.totalExpenses}</span>
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
