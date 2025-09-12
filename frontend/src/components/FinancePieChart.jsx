import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function FinancePieChart({ income, expenses }) {
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  // group รายจ่ายตาม category
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  // ถ้ายังไม่มีข้อมูล ให้กราฟขึ้นสีเทา
  const hasData = income > 0 || totalExpense > 0;

  const data = {
    labels: hasData
      ? ["รายรับ", "รายจ่ายรวม", ...Object.keys(categoryTotals)]
      : ["ไม่มีข้อมูล"],
    datasets: [
      {
        data: hasData
          ? [income, totalExpense, ...Object.values(categoryTotals)]
          : [1], // ใส่ค่า dummy
        backgroundColor: hasData
          ? [
              "#22c55e", // เขียว = รายรับ
              "#ef4444", // แดง = รายจ่ายรวม
              "#3b82f6", // ฟ้า
              "#f59e0b", // เหลือง
              "#8b5cf6", // ม่วง
              "#ec4899", // ชมพู
            ]
          : ["#9ca3af"], // เทา ถ้าไม่มีข้อมูล
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-center mb-2">สรุปการเงิน</h2>
      <Doughnut data={data} />
    </div>
  );
}

export default FinancePieChart;
