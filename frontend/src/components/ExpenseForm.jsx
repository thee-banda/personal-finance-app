import { useState } from "react";
import { useI18n } from "../i18n.jsx";

function ExpenseForm({ onAddExpense }) {
  const { t } = useI18n();

  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("fixed");
  const [priority, setPriority] = useState("necessary");
  const [flexible, setFlexible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc || !amount) return;

    onAddExpense({
      desc,
      amount: Number(amount),
      category,
      priority,
      flexible,
    });

    // reset form
    setDesc("");
    setAmount("");
    setCategory("food");
    setPriority("important");
    setFlexible(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-4 rounded-xl"
    >
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-700">{t.addExpense}</h2>

      {/* Row 1: Description + Amount */}
      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
          placeholder={t.placeholderDesc}
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-32 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
          placeholder={t.placeholderAmount}
        />
      </div>

      {/* Row 2: Category + Priority */}
      <div className="flex gap-4 flex-wrap">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="fixed">{t.categoryFixed}</option>
          <option value="food">{t.categoryFood}</option>
          <option value="entertainment">{t.categoryEntertainment}</option>
          <option value="debt">{t.categoryDebt}</option>
          <option value="health">{t.categoryHealth}</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="necessary">{t.priorityNecessary}</option>
          <option value="important">{t.priorityImportant}</option>
          <option value="optional">{t.priorityOptional}</option>
        </select>
      </div>

      {/* Row 3: Flexible + Submit */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-gray-600">
          <input
            type="checkbox"
            checked={flexible}
            onChange={(e) => setFlexible(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          {t.flexible}
        </label>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md transition"
        >
          {t.add}
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
