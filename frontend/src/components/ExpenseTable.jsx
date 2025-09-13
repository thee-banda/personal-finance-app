import { useState } from "react";
import { useI18n } from "../i18n.jsx";

function ExpenseTable({ expenses, onDeleteExpense, onEditExpense }) {
  const { t } = useI18n();
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({ desc: "", amount: "", category: "" });

  const handleEditClick = (index, expense) => {
    setEditingIndex(index);
    setEditData({ ...expense });
  };

  const handleSaveEdit = () => {
    onEditExpense(editingIndex, editData);
    setEditingIndex(null);
  };

  return (
    <div>
      <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">{t.details}</th>
            <th className="px-4 py-2">{t.amount}</th>
            <th className="px-4 py-2">{t.category}</th>
            <th className="px-4 py-2">{t.priority}</th>
            <th className="px-4 py-2">{t.flexible}</th>
            <th className="px-4 py-2">{t.actions}</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e, i) => (
            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-4 py-2">{e.desc}</td>
              <td className="px-4 py-2">{e.amount} {t.currency}</td>
              <td className="px-4 py-2">{e.category}</td>
              <td className="px-4 py-2">{e.priority}</td>
              <td className="px-4 py-2">{e.flexible ? "✅" : "❌"}</td>
              <td className="px-4 py-2 flex gap-2">
                {/* Edit */}
                <button
                  onClick={() => handleEditClick(i, e)}
                  className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  ✏️
                </button>
                {/* Delete */}
                <button
                  onClick={() => {
                    if (window.confirm("ต้องการลบรายการนี้หรือไม่?")) {
                      onDeleteExpense(i);
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

      {/* Popup Modal แก้ไข */}
      {editingIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              {t.editExpense}
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
              onChange={(e) => setEditData({ ...editData, amount: Number(e.target.value) })}
              className="w-full border px-3 py-2 rounded mb-3 dark:bg-gray-700 dark:text-gray-100"
              placeholder={t.amount}
            />

            <input
              type="text"
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
              className="w-full border px-3 py-2 rounded mb-3 dark:bg-gray-700 dark:text-gray-100"
              placeholder={t.category}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditingIndex(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSaveEdit}
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

export default ExpenseTable;
