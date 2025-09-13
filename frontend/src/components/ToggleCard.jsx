function ToggleCard({ label, checked, onChange }) {
  return (
    <div
      className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={onChange}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-blue-500 cursor-pointer"
        onClick={(e) => e.stopPropagation()} // กัน double trigger
      />
      <span className="font-medium">{label}</span>
    </div>
  );
}

export default ToggleCard;
