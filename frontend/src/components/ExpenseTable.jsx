import { useI18n } from "../i18n.jsx";

function ExpenseTable({ expenses }) {
  const { t } = useI18n();

  return (
    <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors">
      {/* Table Head */}
      <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
        <tr>
          <th className="px-4 py-2 text-left">{t.details}</th>
          <th className="px-4 py-2">{t.amount}</th>
          <th className="px-4 py-2">{t.category}</th>
          <th className="px-4 py-2">{t.priority}</th>
          <th className="px-4 py-2">{t.flexible}</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {expenses.map((e, i) => (
          <tr
            key={i}
            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
              {e.desc}
            </td>
            <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
              {e.amount} {t.currency}
            </td>
            <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
              {e.category}
            </td>
            <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
              {e.priority}
            </td>
            <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
              {e.flexible ? "✅" : "❌"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseTable;
