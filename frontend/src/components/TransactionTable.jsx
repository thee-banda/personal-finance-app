import { useI18n } from "../i18n.jsx";
import { useState } from "react";

function TransactionTable({ transactions, onDelete, onEdit }) {
  const { t } = useI18n();

  const [editingTx, setEditingTx] = useState(null);
  const [editData, setEditData] = useState({
    id: null,
    desc: "",
    amount: 0,
    category: "",
    color: "",
    type: "",
  });

  const handleEditClick = (tx) => {
    setEditingTx(tx.id);
    setEditData({ ...tx });
  };

  const handleSave = () => {
    onEdit(editData);
    setEditingTx(null);
  };

  return (
    <div>
  <table className="w-full text-sm border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
  <thead className="bg-gray-800 text-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">{t.details}</th>
            <th className="px-4 py-2">{t.amount}</th>
            <th className="px-4 py-2">{t.category}</th>
            <th className="px-4 py-2">{t.type}</th>
            <th className="px-4 py-2">{t.actions}</th>
          </tr>
        </thead>
        <tbody>
          {(transactions || []).map((tx) => (
            <tr
              key={tx.id}
              className="hover:bg-gray-700"
            >
              <td className="px-4 py-2 text-gray-100">{tx.desc}</td>
              <td className="px-4 py-2">
                <span className={tx.type === "income" ? "text-green-400" : "text-red-400"}>
                  {tx.amount.toLocaleString()} {t.currency}
                </span>
              </td>
              <td className="px-4 py-2 text-gray-100">{tx.category}</td>
              <td className="px-4 py-2 text-gray-100">
                {tx.type === "income" ? `💰 ${t.income}` : `💸 ${t.expense}`}
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleEditClick(tx)}
                  className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  ✏️
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(t.confirmDeleteTransaction)) {
                      onDelete(tx);
                    }
                  }}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 Edit Modal */}
      {editingTx && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setEditingTx(null)} // ✅ ปิด modal เมื่อกด backdrop
        >
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-lg w-80"
            onClick={(e) => e.stopPropagation()} // กันไม่ให้ modal ปิดตอนคลิกข้างใน
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-100">
              {t.edit}
            </h3>

            <input
              type="text"
              value={editData.desc}
              onChange={(e) => setEditData({ ...editData, desc: e.target.value })}
              className="w-full border border-gray-700 px-3 py-2 rounded-lg mb-3 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder={t.details}
            />

            <input
              type="number"
              value={editData.amount}
              onChange={(e) =>
                setEditData({ ...editData, amount: Number(e.target.value) })
              }
              className="w-full border border-gray-700 px-3 py-2 rounded-lg mb-3 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder={t.amount}
            />

            <input
              type="text"
              value={editData.category}
              onChange={(e) =>
                setEditData({ ...editData, category: e.target.value })}
              className="w-full border border-gray-700 px-3 py-2 rounded-lg mb-3 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder={t.category}
            />

            {/* 🎨 Color Picker */}
            <label className="block mb-2 text-gray-100">
              {t.color}
            </label>
            <input
              type="color"
              value={editData.color || "#8884d8"}
              disabled={editData.type !== "expense"}
              onChange={(e) =>
                setEditData({ ...editData, color: e.target.value })}
              className={`w-16 h-10 border border-gray-700 rounded-lg mb-3 bg-gray-800 ${editData.type !== "expense" ? "opacity-50 cursor-not-allowed" : ""}`}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditingTx(null)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionTable;
