import { useState } from "react";

function IncomeForm({ onAddIncome }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("salary");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc || !amount) return;

    onAddIncome({
      desc,
      amount: Number(amount),
      category,
    });

    setDesc("");
    setAmount("");
    setCategory("salary");
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
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="salary">💼 เงินเดือน</option>
        <option value="bonus">🎁 โบนัส</option>
        <option value="investment">📈 การลงทุน</option>
        <option value="other">อื่น ๆ</option>
      </select>
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
