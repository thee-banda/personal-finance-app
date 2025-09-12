import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // สมมุติ login สำเร็จ → ไป dashboard
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">เข้าสู่ระบบ</h2>
        
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="ชื่อผู้ใช้"
            className="border p-2 w-full mb-4 rounded"
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            className="border p-2 w-full mb-4 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Login
          </button>
        </form>

        {/* back to Register */}
        <p className="text-sm text-center mt-4">
          ยังไม่มีบัญชี?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            สมัครสมาชิก
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
