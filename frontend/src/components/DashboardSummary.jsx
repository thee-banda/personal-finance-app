import { useI18n } from "../i18n.jsx";

function DashboardSummary({ income, expenses, target }) {
  const { t } = useI18n();

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = income - totalExpense;
  const successPercent = target
    ? Math.min(100, ((balance / target) * 100).toFixed(0))
    : 0;

  return (
    <div className="flex flex-col justify-center items-center text-center space-y-2">
      <p className="text-gray-700 dark:text-gray-200 font-medium">
        {t.income}: <span className="font-semibold">{income} {t.currency}</span>
      </p>
      <p className="text-gray-700 dark:text-gray-200 font-medium">
        {t.totalExpenses}: <span className="font-semibold">{totalExpense} {t.currency}</span>
      </p>
      <p
        className={`font-medium ${
          balance >= 0
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        {t.balance}: <span className="font-semibold">{balance} {t.currency}</span>
      </p>
      <p className="text-gray-700 dark:text-gray-200 font-medium">
        {t.successChance}:{" "}
        <span
          className={`font-bold ${
            successPercent >= 80
              ? "text-green-600 dark:text-green-400"
              : "text-orange-500 dark:text-orange-400"
          }`}
        >
          {successPercent}%
        </span>
      </p>
    </div>
  );
}

export default DashboardSummary;
