import { useState } from "react";
import { useI18n } from "../i18n.jsx";

function ExpenseTable({ expenses, onDeleteExpense, onEditExpense }) {
  const { t } = useI18n();
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ desc: "", amount: "", category: "" });
  // Modal state for delete confirmation
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

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
  <table className="w-full text-sm border border-gray-700 rounded-lg overflow-hidden">
  <thead className="bg-gray-800 text-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">{t.details}</th>
            <th className="px-4 py-2">{t.amount}</th>
            <th className="px-4 py-2">{t.category}</th>
            <th className="px-4 py-2">{t.actions}</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id} className="hover:bg-gray-700 transition-colors">
              <td className="px-4 py-2 text-gray-100">{e.desc}</td>
              <td className="px-4 py-2 text-gray-100">
                {e.amount} {t.currency}
              </td>
              <td className="px-4 py-2 text-gray-100">{e.category}</td>
              <td className="px-4 py-2 flex gap-2">
                {/* Edit */}
                <button
                  onClick={() => handleEditClick(e)}
                  className="px-2 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                >
                  ✏️
                </button>
                {/* Delete */}
                <button
                  onClick={() => setDeleteModal({ show: true, id: e.id })}
                  className="px-2 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                >
                  🗑️
                </button>
      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-xs text-center border border-red-500">
            <h3 className="text-lg font-bold mb-4 text-red-300">{t.confirmDeleteExpense}</h3>
            <div className="flex gap-4 justify-center">
              <button
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                onClick={() => {
                  onDeleteExpense(deleteModal.id);
                  setDeleteModal({ show: false, id: null });
                }}
              >{t.confirm}</button>
              <button
                className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 font-semibold hover:bg-gray-600 transition"
                onClick={() => setDeleteModal({ show: false, id: null })}
              >{t.cancel}</button>
            </div>
          </div>
        </div>
      )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Modal แก้ไข */}
      {editingId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4 text-gray-100">
              {t.editExpense}
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

            <select
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
              className="w-full border border-gray-700 px-3 py-2 rounded-lg mb-3 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400"
            >
              <option value="" className="bg-gray-800 text-gray-400">{t.category}</option>
              <option value="Food" className="bg-gray-800 text-gray-100">{t.food}</option>
              <option value="Transport" className="bg-gray-800 text-gray-100">{t.transport}</option>
              <option value="Shopping" className="bg-gray-800 text-gray-100">{t.shopping}</option>
              <option value="Bills" className="bg-gray-800 text-gray-100">{t.bills}</option>
              <option value="Other" className="bg-gray-800 text-gray-100">{t.other}</option>
            </select>

            {/* 🎨 Color Picker */}
            <label className="block mb-2 text-gray-100">
              {t.color}
            </label>
            <input
              type="color"
              value={editData.color || "#8884d8"}
              onChange={(e) => setEditData({ ...editData, color: e.target.value })}
              className="w-16 h-10 border border-gray-700 rounded-lg mb-3 bg-gray-800 cursor-pointer"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditingId(null)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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
