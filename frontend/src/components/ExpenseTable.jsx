import { useI18n } from "../i18n.jsx";

function ExpenseTable({ expenses }) {
  const { t } = useI18n();

  return (
    <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
  <thead className="bg-gray-100 text-gray-700">
    <tr>
      <th className="px-4 py-2 text-left">{t.details}</th>
      <th className="px-4 py-2">{t.amount}</th>
      <th className="px-4 py-2">{t.category}</th>
      <th className="px-4 py-2">{t.priority}</th>
      <th className="px-4 py-2">{t.flexible}</th>
    </tr>
  </thead>
  <tbody>
    {expenses.map((e, i) => (
      <tr key={i} className="hover:bg-gray-50">
        <td className="px-4 py-2">{e.desc}</td>
        <td className="px-4 py-2">{e.amount} {t.currency}</td>
        <td className="px-4 py-2">{e.category}</td>
        <td className="px-4 py-2">{e.priority}</td>
        <td className="px-4 py-2">{e.flexible ? "✅" : "❌"}</td>
      </tr>
    ))}
  </tbody>
</table>

  );
}

export default ExpenseTable;
