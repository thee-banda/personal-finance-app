import { useState } from "react";
import { useI18n } from "../i18n.jsx";

function ExpenseForm({ onAddExpense }) {
  const { t } = useI18n();

  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("custom");
  const [customCategory, setCustomCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc || !amount) return;

    // ✅ ถ้าเลือก custom ใช้ค่าที่ user กรอก
    const finalCategory =
      category === "custom" && customCategory.trim()
        ? customCategory
        : category;

    onAddExpense({
      desc,
      amount: Number(amount),
      category: finalCategory,
    });

    // reset form
    setDesc("");
    setAmount("");
    setCategory("custom");
    setCustomCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder={t.expenseNamePlaceholder}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        type="number"
        placeholder={t.amountPlaceholder}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block mb-2 font-medium text-gray-100"
        >
          {t.category}
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500"
        >
          <option value="custom">{t.custom}</option>
          <option value="fixed">{t.categoryFixed}</option>
          <option value="food">{t.categoryFood}</option>
          <option value="entertainment">{t.categoryEntertainment}</option>
          <option value="debt">{t.categoryDebt}</option>
          <option value="health">{t.categoryHealth}</option>
          <option value="other">{t.categoryOther}</option>
        </select>

        {category === "custom" && (
          <input
            type="text"
            placeholder={t.customCategoryPlaceholder}
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="mt-3 w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        {t.addExpense}
      </button>

    </form>
  );
}

export default ExpenseForm;
