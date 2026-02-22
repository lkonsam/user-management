import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function UserLayout({ children }: Props) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    context?.logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="bg-white shadow px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <h1 className="text-lg sm:text-xl font-semibold">User Dashboard</h1>

        <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
          <span className="text-xs sm:text-sm text-gray-600 truncate flex-1 sm:flex-none">
            {context?.user?.name}
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-red-700 text-xs sm:text-sm font-medium transition whitespace-nowrap"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-6">{children}</main>
    </div>
  );
}
