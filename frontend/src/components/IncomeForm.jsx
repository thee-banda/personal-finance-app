import { useState } from "react";
import { useI18n } from "../i18n.jsx";

function IncomeForm({ onAddIncome }) {
  const { t } = useI18n();
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("custom");
  const [customCategory, setCustomCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc || !amount) return;

    const finalCategory =
      category === "custom" && customCategory.trim()
        ? customCategory
        : category;

    if (typeof onAddIncome === "function") {
      onAddIncome({
        id: Date.now(),
        type: "income",
        desc,
        amount: Number(amount),
        category: finalCategory,
      });
    } else {
      console.error("onAddIncome is not a function");
    }

    setDesc("");
    setAmount("");
    setCategory("custom");
    setCustomCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder={t.incomePlaceholder}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 
                   bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800
                   focus:outline-none"
      />
      <input
        type="number"
        placeholder={t.amountPlaceholder}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 
                   bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800
                   focus:outline-none"
      />
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
        >
          {t.category}
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 
                     bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                     focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800
                     focus:outline-none"
        >
          <option value="custom">-- {t.custom} --</option>
          <option value="salary">💼 {t.salary}</option>
          <option value="bonus">🎁 {t.bonus}</option>
          <option value="investment">📈 {t.investment}</option>
          <option value="other">{t.other}</option>
        </select>

        {category === "custom" && (
          <input
            type="text"
            placeholder={t.customCategoryPlaceholder}
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="mt-3 w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 
                       bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                       focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800
                       focus:outline-none"
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 
                   text-white rounded-lg px-4 py-2 transition-colors duration-200 
                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                   dark:focus:ring-offset-gray-800"
      >
        {t.saveIncome}
      </button>
    </form>
  );
}

export default IncomeForm;
