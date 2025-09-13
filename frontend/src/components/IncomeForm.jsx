import { useState } from "react";

function IncomeForm({ onAddIncome }) {
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

    onAddIncome({
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
        placeholder="ชื่อรายรับ"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <input
        type="number"
        placeholder="จำนวนเงิน"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
        >
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 
                     bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                     focus:ring-2 focus:ring-blue-500"
        >
          <option value="custom">-- Custom --</option>
          <option value="salary">💼 เงินเดือน</option>
          <option value="bonus">🎁 โบนัส</option>
          <option value="investment">📈 การลงทุน</option>
          <option value="other">อื่น ๆ</option>
        </select>

        {category === "custom" && (
          <input
            type="text"
            placeholder="กรอกหมวดหมู่เอง..."
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="mt-3 w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 
                       bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                       focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2"
      >
        บันทึกรายรับ
      </button>
    </form>
  );
}

export default IncomeForm;
