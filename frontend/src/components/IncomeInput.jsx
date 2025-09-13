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
      <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
        {t.incomeLabel}
      </label>
      <input
        type="number"
        placeholder={t.incomePlaceholder}
        value={incomeValue}
        onChange={(e) => setIncomeValue(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full mb-2 
                   bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {/* Target */}
      <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
        {t.targetLabel}
      </label>
      <input
        type="number"
        placeholder={t.targetPlaceholder}
        value={targetValue}
        onChange={(e) => setTargetValue(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full mb-2 
                   bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded 
                   shadow-md transition w-full"
      >
        {t.save}
      </button>
    </div>
  );
}

export default IncomeInput;
