import { useState } from "react";
import { useI18n } from "../i18n.jsx"; // ✅ import hook

function IncomeInput({ setIncome, setTarget }) {
  const { t } = useI18n(); // ✅ ใช้ dictionary
  const [incomeValue, setIncomeValue] = useState("");
  const [targetValue, setTargetValue] = useState("");

  const handleSave = () => {
    setIncome(Number(incomeValue));
    setTarget(Number(targetValue));
  };

  return (
    <div className="mb-4">
      {/* Income */}
  <label className="block mb-1 font-semibold text-gray-100">
        {t.incomeLabel}
      </label>
      <input
        type="number"
        placeholder={t.incomePlaceholder}
        value={incomeValue}
        onChange={(e) => setIncomeValue(e.target.value)}
        className="border border-gray-700 p-2 rounded w-full mb-2 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {/* Target */}
  <label className="block mb-1 font-semibold text-gray-100">
        {t.targetLabel}
      </label>
      <input
        type="number"
        placeholder={t.targetPlaceholder}
        value={targetValue}
        onChange={(e) => setTargetValue(e.target.value)}
        className="w-full border border-gray-700 rounded-lg px-4 py-3 text-base sm:text-lg bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-3"
      />

      <button
        onClick={handleSave}
        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-5 sm:px-6 py-3 rounded-lg shadow-md text-base sm:text-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {t.save}
      </button>
    </div>
  );
}

export default IncomeInput;
