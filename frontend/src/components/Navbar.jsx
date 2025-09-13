import { useState, useEffect } from "react";
import { useI18n } from "../i18n.jsx";

function Navbar() {
  const { lang, setLang, t } = useI18n();
  const [pin, setPin] = useState(localStorage.getItem("pin") || "");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // เก็บ PIN ลง localStorage
  useEffect(() => {
    localStorage.setItem("pin", pin);
  }, [pin]);

  // apply theme ไปที่ <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

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
    <nav className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6 py-4 shadow-md transition-colors">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* ชื่อเว็บ */}
        <h1 className="font-bold text-xl text-blue-600 dark:text-blue-400 tracking-wide">
          {t.appName}
        </h1>

        <div className="flex items-center gap-3">
          {/* ช่องใส่ PIN */}
          <input
            type="password"
            value={pin}
            onChange={handlePinChange}
            placeholder={t.pinPlaceholder}
            className="w-32 text-center px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
            maxLength={6}
            inputMode="numeric"
          />

          {/* ปุ่มเปลี่ยนภาษา */}
          <button
            onClick={toggleLanguage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors"
          >
            {lang}
          </button>

          {/* ปุ่ม toggle theme */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Toggle Dark Mode"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
