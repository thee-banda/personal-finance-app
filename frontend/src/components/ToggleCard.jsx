function ToggleCard({ label, checked, onChange }) {
  return (
    <div
      className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-600"
      onClick={onChange}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-blue-500 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        onClick={(e) => e.stopPropagation()} // กัน double trigger
      />
      <span className="font-medium text-gray-700 dark:text-gray-200">{label}</span>
    </div>
  );
}

export default ToggleCard;
