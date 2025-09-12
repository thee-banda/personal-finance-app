function DashboardSummary({ income, expenses, target }) {
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = income - totalExpense;
  const successPercent = target
    ? Math.min(100, ((balance / target) * 100).toFixed(0))
    : 0;


  return (
    <div className="bg-white shadow-md rounded p-4 w-full max-w-md text-center">
      <p>รายรับ: {income} บาท</p>
      <p>รายจ่ายรวม: {totalExpense} บาท</p>
      <p className={balance >= 0 ? "text-green-600" : "text-red-600"}>
        เงินคงเหลือจริง: {balance} บาท
      </p>
      <p>
        โอกาสบรรลุเป้า:{" "}
        <span
          className={
            successPercent >= 80 ? "text-green-600" : "text-orange-500"
          }
        >
          {successPercent}%
        </span>
      </p>
    </div>
  );
}

export default DashboardSummary;
