import { useState } from "react";

function IncomeInput({ setIncome, setTarget }) {
  const [incomeValue, setIncomeValue] = useState("");
  const [targetValue, setTargetValue] = useState("");

  const handleSave = () => {
    setIncome(Number(incomeValue));
    setTarget(Number(targetValue));
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">ระบุรายรับ</label>
      <input
        type="number"
        placeholder="เช่น 20000"
        value={incomeValue}
        onChange={(e) => setIncomeValue(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

      <label className="block mb-1 font-semibold">เป้าหมายเงินคงเหลือ</label>
      <input
        type="number"
        placeholder="เช่น 6000"
        value={targetValue}
        onChange={(e) => setTargetValue(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        บันทึก
      </button>
    </div>
  );
}

export default IncomeInput;
