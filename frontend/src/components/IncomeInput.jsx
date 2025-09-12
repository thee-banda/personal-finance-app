import { useState } from "react";

function IncomeInput({ onSetIncome }) {
    const [income, setIncome] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSetIncome(Number(income));
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <label className="block text-gray-700 mb-1">ระบุรายรับ</label>
            <div className="flex gap-2">
                <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="border p-2 rounded w-64"
                    placeholder="เช่น 20000"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    บันทึก
                </button>
            </div>
            
        </form>

    );
}

export default IncomeInput;
