import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../api/auth.api";

export default function Login() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const loginData = await login(form.email, form.password);
      
      context?.login(loginData);

      if (loginData.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-800">
          User Management Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 sm:py-2 text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
