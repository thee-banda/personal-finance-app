import { useState } from "react";

function ExpenseForm({ onAddExpense }) {
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

    setDesc("");
    setAmount("");
    setCategory("food");
    setPriority("important");
    setFlexible(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <label className="block text-gray-700">เพิ่มรายจ่าย</label>
      <div className="flex flex-wrap gap-2 mt-2">
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border p-2 rounded"
          placeholder="ค่าไฟ"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-28"
          placeholder="จำนวนเงิน"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="fixed">🏠 ค่าใช้จ่ายคงที่</option>
          <option value="food">🍔 อาหาร</option>
          <option value="entertainment">🎮 บันเทิง</option>
          <option value="debt">💳 หนี้สิน</option>
          <option value="health">💊 สุขภาพ</option>
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="necessary">จำเป็น</option>
          <option value="important">สำคัญ</option>
          <option value="optional">ไม่จำเป็น</option>
        </select>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={flexible}
            onChange={(e) => setFlexible(e.target.checked)}
          />
          ปรับได้
        </label>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          เพิ่ม
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
