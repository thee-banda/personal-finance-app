import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">สมัครสมาชิก</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="ชื่อผู้ใช้"
            className="border p-2 w-full mb-4 rounded"
          />
          <input
            type="email"
            placeholder="อีเมล"
            className="border p-2 w-full mb-4 rounded"
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            className="border p-2 w-full mb-4 rounded"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Register
          </button>
        </form>

        {/* back to Login */}
        <p className="text-sm text-center mt-4">
          มีบัญชีแล้ว?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
