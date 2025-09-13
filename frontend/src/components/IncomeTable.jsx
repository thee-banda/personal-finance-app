function IncomeTable({ incomes, onDeleteIncome, onEditIncome }) {
  return (
    <table className="w-full border-collapse border border-gray-300 text-sm">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-700">
          <th className="border px-4 py-2">ชื่อ</th>
          <th className="border px-4 py-2">จำนวนเงิน</th>
          <th className="border px-4 py-2">หมวดหมู่</th>
          <th className="border px-4 py-2">การจัดการ</th>
        </tr>
      </thead>
      <tbody>
        {incomes.map((income, index) => (
          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="border px-4 py-2">{income.desc}</td>
            <td className="border px-4 py-2">{income.amount.toLocaleString()}</td>
            <td className="border px-4 py-2">{income.category}</td>
            <td className="border px-4 py-2">
              <button
                onClick={() => onEditIncome(index, income)}
                className="text-blue-500 hover:underline mr-2"
              >
                ✏️ แก้ไข
              </button>
              <button
                onClick={() => onDeleteIncome(index)}
                className="text-red-500 hover:underline"
              >
                🗑️ ลบ
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default IncomeTable;
