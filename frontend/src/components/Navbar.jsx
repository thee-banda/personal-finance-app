import { useState, useEffect } from "react";
import { useI18n } from "../i18n.jsx";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const { lang, setLang, t } = useI18n();
  const [pin, setPin] = useState(localStorage.getItem("pin") || "");

  // เก็บ PIN ลง localStorage
  useEffect(() => {
    localStorage.setItem("pin", pin);
  }, [pin]);

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // ตัวเลขเท่านั้น
    if (value.length <= 6) {
      setPin(value);
    }
  };

  const toggleLanguage = () => {
    setLang(lang === "EN" ? "TH" : "EN");
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 
                    px-3 sm:px-4 lg:px-6 py-2 sm:py-3 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
        <h1 className="font-bold text-base sm:text-lg lg:text-xl text-blue-600 dark:text-blue-400">
          {t.appName}
        </h1>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* PIN Input (optional) */}
          {/* <input
            type="password"
            value={pin}
            onChange={handlePinChange}
            placeholder={t.pinPlaceholder}
            className="w-28 sm:w-32 text-center px-2 sm:px-3 py-2 rounded-lg 
                       border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
                       focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900
                       focus:outline-none"
            maxLength={6}
            inputMode="numeric"
          /> */}

          {/* Switch Language EN/TH */}
          <button
            onClick={toggleLanguage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 
                       rounded-lg transition-colors duration-200 text-sm sm:text-base
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                       dark:focus:ring-offset-gray-900"
          >
            {lang}
          </button>

          {/* Theme Toggle */}
          <ThemeToggle size="default" variant="button" showLabel={false} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
