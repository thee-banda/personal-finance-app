import { useState } from "react";
import { useI18n } from "../i18n.jsx";

function ExpenseForm({ onAddExpense }) {
  const { t } = useI18n();

  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("fixed");
  const [customCategory, setCustomCategory] = useState(""); // ✅ state สำหรับ custom
  const [priority, setPriority] = useState("necessary");
  const [flexible, setFlexible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc || !amount) return;

    const finalCategory = category === "custom" ? customCategory : category;

    if (!finalCategory) return; // ป้องกัน user ไม่พิมพ์ custom

    onAddExpense({
      desc,
      amount: Number(amount),
      category: finalCategory,
      priority,
      flexible,
    });

    // reset form
    setDesc("");
    setAmount("");
    setCategory("fixed");
    setCustomCategory("");
    setPriority("necessary");
    setFlexible(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Expense name */}
      <input
        type="text"
        placeholder={t.placeholderDesc}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
      />

      {/* Amount */}
      <input
        type="number"
        placeholder={t.placeholderAmount}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
      />

      {/* Category */}
      <div className="flex flex-col gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
        >
          <option value="fixed">{t.categoryFixed}</option>
          <option value="food">{t.categoryFood}</option>
          <option value="entertainment">{t.categoryEntertainment}</option>
          <option value="debt">{t.categoryDebt}</option>
          <option value="health">{t.categoryHealth}</option>
          <option value="custom">➕ {t.categoryCustom || "Custom"}</option>
        </select>

        {/* ถ้าเลือก custom → แสดง input */}
        {category === "custom" && (
          <input
            type="text"
            placeholder={t.categoryCustomPlaceholder || "Enter custom category"}
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-blue-400 dark:border-blue-500 
                       bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                       focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>

      {/* Priority */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
      >
        <option value="necessary">{t.priorityNecessary}</option>
        <option value="important">{t.priorityImportant}</option>
        <option value="optional">{t.priorityOptional}</option>
      </select>

      {/* Flexible checkbox */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={flexible}
          onChange={(e) => setFlexible(e.target.checked)}
          className="h-4 w-4"
        />
        {t.flexible}
      </label>

      {/* Add button */}
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold"
      >
        {t.add}
      </button>
    </form>
  );
}

export default ExpenseForm;
