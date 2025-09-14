import React from "react";

function Footer() {
  return (
    <footer className="w-full mt-12 py-6 px-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 text-center rounded-t-2xl shadow-xl backdrop-blur-md">
      <div className="max-w-4xl mx-auto">
        <p className="text-base font-medium mb-2">
          Personal Finance App - จัดการรายรับรายจ่ายและเป้าหมายการเงินของคุณอย่างง่ายดาย
        </p>
        <p className="text-sm text-gray-400">
          คำอธิบายเว็บ: แอพนี้ช่วยให้คุณติดตามรายรับ รายจ่าย และวางแผนเป้าหมายทางการเงินได้อย่างมีประสิทธิภาพ พร้อมกราฟสรุปและฟีเจอร์ทันสมัย
        </p>
        <p className="text-xs text-blue-400 mt-2">
          * เว็บไซต์นี้ออกแบบและปรับแต่งสไตล์ด้วยความช่วยเหลือจาก AI เพื่อความสวยงามและทันสมัย
        </p>
        <p className="text-xs mt-3 text-gray-500">
          &copy; {new Date().getFullYear()} thee-banda. All rights reserved.
        </p>
        <div className="mt-4 text-xs text-gray-400 flex flex-wrap items-center justify-center gap-3">
          <span className="font-semibold text-blue-400">เทคโนโลยีที่ใช้:</span>
          <span className="flex items-center gap-1">
            {/* React */}
            <svg viewBox="0 0 32 32" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="2.5" fill="#61DAFB"/><g stroke="#61DAFB" strokeWidth="2"><ellipse rx="13" ry="5.5" transform="matrix(.866 .5 -.866 .5 16 16)"/><ellipse rx="13" ry="5.5" transform="matrix(-.866 .5 .866 .5 16 16)"/><ellipse rx="13" ry="5.5" transform="matrix(0 1 1 0 16 16)"/></g></svg>
            React
          </span>
          <span className="flex items-center gap-1">
            {/* Tailwind CSS */}
            <svg viewBox="0 0 48 48" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 14c-4.418 0-7.418 2.236-9 6.708C16.582 16.236 19.582 14 24 14c4.418 0 7.418 2.236 9 6.708C31.418 16.236 28.418 14 24 14z" fill="#38BDF8"/><path d="M24 34c4.418 0 7.418-2.236 9-6.708C31.418 31.764 28.418 34 24 34c-4.418 0-7.418-2.236-9-6.708C16.582 31.764 19.582 34 24 34z" fill="#38BDF8"/></svg>
            Tailwind CSS
          </span>
          <span className="flex items-center gap-1">
            {/* Chart.js */}
            <svg viewBox="0 0 32 32" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#FF6384"/><path d="M16 16V4" stroke="#fff" strokeWidth="2"/><path d="M16 16L28 16" stroke="#fff" strokeWidth="2"/><path d="M16 16L8 24" stroke="#fff" strokeWidth="2"/></svg>
            Chart.js
          </span>
          <span className="flex items-center gap-1">
            {/* Vite */}
            <svg viewBox="0 0 32 32" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="vite1" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse"><stop stopColor="#41D1FF"/><stop offset="1" stopColor="#BD34FE"/></linearGradient></defs><path d="M16 2l14 6-14 22L2 8l14-6z" fill="url(#vite1)"/><path d="M16 2v26" stroke="#fff" strokeWidth="2"/></svg>
            Vite
          </span>
          <span className="flex items-center gap-1">
            {/* AI (Copilot) */}
            <svg viewBox="0 0 32 32" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#10B981"/><text x="16" y="21" textAnchor="middle" fontSize="13" fill="#fff" fontFamily="Arial">AI</text></svg>
            AI (Copilot)
          </span>
        </div>
        <div className="mt-4">
          <div className="mb-1 text-sm text-blue-400 font-semibold">Contact (ติดต่อผู้พัฒนา):</div>
          <a
            href="https://github.com/thee-banda"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-blue-400 rounded-lg shadow transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="20" height="20" className="inline">
              <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.34-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.747-1.025 2.747-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.175 22 16.427 22 12.012 22 6.484 17.523 2 12 2z"/>
            </svg>
            GitHub: thee-banda
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
