import { useI18n } from "../i18n.jsx";

function DashboardSummary({ income, expenses, target }) {
  const { t } = useI18n();

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = income - totalExpense;
  const successPercent = target
    ? Math.min(100, ((balance / target) * 100).toFixed(0))
    : 0;

  return (
    <div className="bg-white shadow-md rounded p-4 w-full max-w-md text-center">
      <p>
        {t.income}: {income} บาท
      </p>
      <p>
        {t.totalExpenses}: {totalExpense} บาท
      </p>
      <p className={balance >= 0 ? "text-green-600" : "text-red-600"}>
        {t.balance}: {balance} บาท
      </p>
      <p>
        {t.successChance}:{" "}
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
