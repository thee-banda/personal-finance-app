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
      <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">{t.details}</th>
            <th className="px-4 py-2">{t.amount}</th>
            <th className="px-4 py-2">{t.category}</th>
            <th className="px-4 py-2">{t.type}</th>
            <th className="px-4 py-2">{t.actions}</th>
          </tr>
        </thead>
        <tbody>
          {(transactions || []).map((tx, i) => (
            <tr
              key={`${tx.type}-${tx.id}-${i}`}
              className="hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="px-4 py-2">{tx.desc}</td>
              <td className="px-4 py-2">
                <span
                  className={
                    tx.type === "income" ? "text-green-600" : "text-red-500"
                  }
                >
                  {tx.amount.toLocaleString()} {t.currency}
                </span>
              </td>
              <td className="px-4 py-2">{tx.category}</td>
              <td className="px-4 py-2">
                {tx.type === "income"
                  ? `💰 ${t.income}`
                  : `💸 ${t.expense}`}
              </td>
              <td className="px-4 py-2 flex gap-2">
                {/* ✅ ปุ่ม Edit */}
                <button
                  onClick={() => handleEditClick(tx)}
                  className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  ✏️
                </button>
                {/* ✅ ปุ่ม Delete */}
                <button
                  onClick={() => {
                    if (window.confirm(t.confirmDeleteTransaction)) {
                      onDelete(tx);
                    }
                  }}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              {t.edit}
            </h3>

            <input
              type="text"
              value={editData.desc}
              onChange={(e) => setEditData({ ...editData, desc: e.target.value })}
              className="w-full border px-3 py-2 rounded mb-3 dark:bg-gray-700 dark:text-gray-100"
              placeholder={t.details}
            />

            <input
              type="number"
              value={editData.amount}
              onChange={(e) =>
                setEditData({ ...editData, amount: Number(e.target.value) })
              }
              className="w-full border px-3 py-2 rounded mb-3 dark:bg-gray-700 dark:text-gray-100"
              placeholder={t.amount}
            />

            <input
              type="text"
              value={editData.category}
              onChange={(e) =>
                setEditData({ ...editData, category: e.target.value })
              }
              className="w-full border px-3 py-2 rounded mb-3 dark:bg-gray-700 dark:text-gray-100"
              placeholder={t.category}
            />

            {/* 🎨 Color Picker */}
            <label className="block mb-2 text-gray-700 dark:text-gray-200">
              {t.color}
            </label>
            {editData.type === "expense" ? (
              <input
                type="color"
                value={editData.color || "#8884d8"}
                onChange={(e) =>
                  setEditData({ ...editData, color: e.target.value })
                }
                className="w-16 h-10 border rounded mb-3"
              />
            ) : (
              <input
                type="color"
                value={editData.color || "#8884d8"}
                disabled
                className="w-16 h-10 border rounded mb-3 opacity-50 cursor-not-allowed"
              />
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditingTx(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
