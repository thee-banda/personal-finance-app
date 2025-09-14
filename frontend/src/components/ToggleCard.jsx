function ToggleCard({ label, checked, onChange }) {
  return (
    <label
      className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer
                  bg-gray-100 dark:bg-gray-700
                  border-gray-200 dark:border-gray-600
                  shadow-sm hover:shadow-md 
                  transition-colors shadow duration-200`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-blue-500 cursor-pointer 
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                   dark:focus:ring-offset-gray-800"
      />
      <span className="font-medium text-gray-700 dark:text-gray-200">{label}</span>
    </label>
  );
}

export default ToggleCard;
