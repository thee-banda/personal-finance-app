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
  className="flex flex-col gap-4"
>
  {/* Expense name */}
  <input
    type="text"
    placeholder="e.g. Electricity bill"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
  />

  {/* Amount */}
  <input
    type="number"
    placeholder="Amount"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
  />

  {/* Category */}
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
  >
    <option>🏠 Fixed Expenses</option>
    <option>🍔 Food & Essentials</option>
    <option>🎮 Entertainment</option>
    <option>💊 Health</option>
  </select>

  {/* Priority */}
  <select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
  >
    <option>Necessary</option>
    <option>Optional</option>
  </select>

  {/* Flexible checkbox */}
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={flexible}
      onChange={(e) => setFlexible(e.target.checked)}
      className="h-4 w-4"
    />
    Flexible
  </label>

  {/* Add button */}
  <button
    type="submit"
    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold"
  >
    Add
  </button>
</form>

  );
}

export default ExpenseForm;
