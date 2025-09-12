function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">สมัครสมาชิก</h2>
      <form className="bg-white p-6 rounded shadow-md w-80">
        <input
          type="email"
          placeholder="อีเมล"
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="password"
          placeholder="รหัสผ่าน"
          className="border p-2 w-full mb-3 rounded"
        />
        <button className="bg-green-500 text-white w-full py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
