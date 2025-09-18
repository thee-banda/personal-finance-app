import { useState, useEffect } from "react";
import { useI18n } from "../i18n.jsx";
// ...existing code...

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
  <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-100 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 shadow-lg backdrop-blur-md bg-opacity-80 rounded-xl border border-gray-800">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
  <h1 className="font-bold text-lg sm:text-xl lg:text-2xl text-gray-100 drop-shadow">
        {t.appName}
      </h1>

      <div className="flex items-center gap-3">
        {/* Login/Register (disabled) */}
        <button
          disabled
          title="ยังไม่มีบริการ Login/Register"
          className="bg-gray-700 text-gray-400 px-3 py-2 rounded-xl shadow cursor-not-allowed border border-gray-600 opacity-70 flex items-center gap-2"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8zm6 8v-2a6 6 0 00-12 0v2" />
          </svg>
          Login/Register
        </button>
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
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-3 lg:px-5 py-2 rounded-xl shadow-md transition-all text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            {lang}
          </button>

          {/* Theme Toggle */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
