import { useState, useEffect } from "react";

function Navbar() {
  const [pin, setPin] = useState(localStorage.getItem("pin") || "");
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "EN");

  // บันทึกค่า PIN ทุกครั้งที่เปลี่ยน
  useEffect(() => {
    localStorage.setItem("pin", pin);
  }, [pin]);

  // บันทึกภาษาทุกครั้งที่เปลี่ยน
  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // ตัวเลขเท่านั้น
    if (value.length <= 6) {
      setPin(value);
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "TH" : "EN"));
  };

  return (
    <nav className="bg-white-600 text-white px-6 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* ชื่อเว็บ */}
        <h1 className="font-bold text-blue-600 text-lg">Personal Finance</h1>

        <div className="flex items-center gap-3">
          {/* ช่องใส่ PIN */}
          <input
            type="password"
            value={pin}
            onChange={handlePinChange}
            placeholder="Enter PIN"
            className="w-32 text-center px-2 py-1 rounded text-black"
            maxLength={6}
            inputMode="numeric"
          />

          {/* ปุ่มเปลี่ยนภาษา */}
          <button
            onClick={toggleLanguage}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
          >
            {language}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
