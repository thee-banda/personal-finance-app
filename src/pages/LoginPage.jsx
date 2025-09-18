import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useI18n } from "../i18n.jsx";

function LoginPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // mock login → บันทึก user ลง localStorage
    localStorage.setItem("user", JSON.stringify({ email }));
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4">{t.login}</h2>

      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.email}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t.password}
          className="border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
        >
          {t.login}
        </button>
      </form>

      <p className="text-sm mt-3">
        {t.noAccount}{" "}
        <Link to="/register" className="text-blue-600 underline">
          {t.register}
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
