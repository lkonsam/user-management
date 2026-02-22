import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    context?.logout();
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", path: "/admin" },
    { label: "Profile", path: "/profile" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 flex-col md:flex-row">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:flex md:flex-col w-full md:w-64 bg-gray-900 text-white fixed md:static h-screen md:h-auto z-50 transition-all duration-200`}
      >
        {/* Close Button - Mobile Only */}
        <div className="md:hidden flex justify-between items-center p-4 border-b border-gray-700">
          <div className="text-lg font-bold">Admin Panel</div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white hover:bg-gray-700 p-1 rounded transition"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Header - Desktop Only */}
        <div className="hidden md:block p-4 sm:p-6 text-lg sm:text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm sm:text-base"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg transition text-sm sm:text-base font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">

        {/* Top Navbar */}
        <header className="bg-white shadow px-4 sm:px-6 py-4 flex justify-between items-center">
          {/* Mobile: Hamburger + Title + User Info */}
          <div className="md:hidden flex items-center gap-3 flex-1 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 text-gray-700 hover:bg-gray-200 rounded transition flex-shrink-0"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="min-w-0">
              <h1 className="text-sm font-semibold text-gray-900 truncate">Admin Dashboard</h1>
              <p className="text-xs text-gray-600 truncate">Logged in as: {context?.user?.name}</p>
            </div>
          </div>

          {/* Desktop: Title + User Info */}
          <div className="hidden md:flex justify-between items-center w-full">
            <h1
              className="text-lg sm:text-xl font-semibold hover:cursor-pointer truncate"
              onClick={() => navigate("/admin")}
            >
              Admin Dashboard
            </h1>
            <div className="text-xs sm:text-sm text-gray-600 truncate ml-4">
              Logged in as: <span className="font-medium">{context?.user?.name}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
