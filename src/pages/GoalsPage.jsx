import { useState } from "react";

function GoalsPage() {
  const [target, setTarget] = useState(6000);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 ตั้งเป้าหมายเงินคงเหลือ</h2>
      <form className="bg-white p-6 rounded shadow-md w-80">
        <label className="block mb-2">เงินคงเหลือที่คาดหวังต่อเดือน</label>
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />
        <button className="bg-purple-500 text-white w-full py-2 rounded">
          บันทึกเป้าหมาย
        </button>
      </form>
    </div>
  );
}

export default GoalsPage;
