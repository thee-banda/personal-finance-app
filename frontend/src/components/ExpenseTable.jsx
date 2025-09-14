import { useState } from "react";
import { useI18n } from "../i18n.jsx";

function ExpenseTable({ expenses, onDeleteExpense, onEditExpense }) {
  const { t } = useI18n();
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ desc: "", amount: "", category: "" });

  const handleEditClick = (expense) => {
    setEditingId(expense.id);
    setEditData({ ...expense });
  };

  const handleSaveEdit = () => {
    onEditExpense(editingId, editData);
    setEditingId(null);
  };

  return (
    <div>
      <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">{t.details}</th>
            <th className="px-4 py-2">{t.amount}</th>
            <th className="px-4 py-2">{t.category}</th>
            <th className="px-4 py-2">{t.actions}</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{e.desc}</td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
                {e.amount} {t.currency}
              </td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{e.category}</td>
              <td className="px-4 py-2 flex gap-2">
                {/* Edit */}
                <button
                  onClick={() => handleEditClick(e)}
                  className="px-2 py-1 text-sm bg-blue-500 hover:bg-blue-600 
                             dark:bg-blue-600 dark:hover:bg-blue-700 
                             text-white rounded transition-colors"
                >
                  ✏️
                </button>
                {/* Delete */}
                <button
                  onClick={() => {
                    if (window.confirm(t.confirmDeleteExpense)) {
                      onDeleteExpense(e.id);
                    }
                  }}
                  className="px-2 py-1 text-sm bg-red-500 hover:bg-red-600 
                             dark:bg-red-600 dark:hover:bg-red-700 
                             text-white rounded transition-colors"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Modal แก้ไข */}
      {editingId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              {t.editExpense}
            </h3>

            <input
              type="text"
              value={editData.desc}
              onChange={(e) => setEditData({ ...editData, desc: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg mb-3 
                         bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                         focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800
                         focus:outline-none"
              placeholder={t.details}
            />

            <input
              type="number"
              value={editData.amount}
              onChange={(e) =>
                setEditData({ ...editData, amount: Number(e.target.value) })
              }
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg mb-3 
                         bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                         focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800
                         focus:outline-none"
              placeholder={t.amount}
            />

            <input
              type="text"
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg mb-3 
                         bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                         focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800
                         focus:outline-none"
              placeholder={t.category}
            />

            {/* 🎨 Color Picker */}
            <label className="block mb-2 text-gray-700 dark:text-gray-200">
              {t.color}
            </label>
            <input
              type="color"
              value={editData.color || "#8884d8"}
              onChange={(e) => setEditData({ ...editData, color: e.target.value })}
              className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded-lg mb-3 
                         bg-white dark:bg-gray-700 cursor-pointer"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditingId(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 
                           transition-colors duration-200 focus:outline-none 
                           focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 
                           dark:focus:ring-offset-gray-800"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700
                           text-white rounded-lg transition-colors duration-200 focus:outline-none 
                           focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                           dark:focus:ring-offset-gray-800"
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
