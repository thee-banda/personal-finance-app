import { useI18n } from "../i18n.jsx";

function ExpenseTable({ expenses }) {
  const { t } = useI18n();

  return (
    <table className="w-full text-xs sm:text-sm md:text-base border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
        <tr>
          <th className="px-2 sm:px-4 py-2">{t.details}</th>
          <th className="px-2 sm:px-4 py-2">{t.amount}</th>
          <th className="px-2 sm:px-4 py-2">{t.category}</th>
          <th className="px-2 sm:px-4 py-2">{t.priority}</th>
          <th className="px-2 sm:px-4 py-2">{t.flexible}</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((e, i) => (
          <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="px-2 sm:px-4 py-2">{e.desc}</td>
            <td className="px-2 sm:px-4 py-2">{e.amount} {t.currency}</td>
            <td className="px-2 sm:px-4 py-2">{e.category}</td>
            <td className="px-2 sm:px-4 py-2">{e.priority}</td>
            <td className="px-2 sm:px-4 py-2">{e.flexible ? "✅" : "❌"}</td>
          </tr>
        ))}
      </tbody>
    </table>

  );
}

export default ExpenseTable;
