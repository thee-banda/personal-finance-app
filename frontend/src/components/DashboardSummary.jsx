import { useI18n } from "../i18n.jsx";

function DashboardSummary({ income, expenses, target }) {
  const { t } = useI18n();

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = income - totalExpense;
  const successPercent = target
    ? Math.min(100, ((balance / target) * 100).toFixed(0))
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 sm:p-6 w-full max-w-md text-center space-y-3">
      <p className="text-gray-700 dark:text-gray-200">{t.income}: {income} {t.currency}</p>
      <p className="text-gray-700 dark:text-gray-200">{t.totalExpenses}: {totalExpense} {t.currency}</p>
      <p className={balance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
        {t.balance}: {balance} {t.currency}
      </p>
      <p className="text-gray-700 dark:text-gray-200">
        {t.successChance}:{" "}
        <span className={successPercent >= 80 ? "text-green-600 dark:text-green-400" : "text-orange-500 dark:text-orange-400"}>
          {successPercent}%
        </span>
      </p>
    </div>

  );
}

export default DashboardSummary;
