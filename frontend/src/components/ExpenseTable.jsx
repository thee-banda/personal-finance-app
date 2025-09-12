function ExpenseTable({ expenses }) {
  return (
    <table className="border-collapse border border-gray-400 w-full max-w-3xl mb-6 text-sm">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">รายละเอียด</th>
          <th className="border p-2">จำนวนเงิน</th>
          <th className="border p-2">หมวด</th>
          <th className="border p-2">Priority</th>
          <th className="border p-2">Flexible</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((e, i) => (
          <tr key={i}>
            <td className="border p-2">{e.desc}</td>
            <td className="border p-2">{e.amount} บาท</td>
            <td className="border p-2">{e.category}</td>
            <td className="border p-2">{e.priority}</td>
            <td className="border p-2">{e.flexible ? "✅" : "❌"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseTable;
