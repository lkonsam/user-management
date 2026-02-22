import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import UpdateProfileModal from "../components/UpdateProfileModal";

export default function Profile() {
  const context = useContext(AuthContext);
  const user = context?.user;
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("User data in Profile:", user);

  const Layout = user?.status === "ACTIVE" && user?.role === "ADMIN" ? AdminLayout : UserLayout;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-0">
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold">My Profile</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base font-medium transition"
            >
              Edit
            </button>
          </div>

          <div className="space-y-4 sm:space-y-3">
            <div className="border-b pb-4 sm:pb-3">
              <label className="text-xs sm:text-sm text-gray-500 block mb-1">Name</label>
              <p className="font-medium text-base sm:text-lg">{user?.name}</p>
            </div>

            <div className="border-b pb-4 sm:pb-3">
              <label className="text-xs sm:text-sm text-gray-500 block mb-1">Email</label>
              <p className="font-medium text-base sm:text-lg break-all">{user?.email}</p>
            </div>

            <div className="border-b pb-4 sm:pb-3">
              <label className="text-xs sm:text-sm text-gray-500 block mb-1">Role</label>
              <p className="font-medium text-base sm:text-lg">{user?.role}</p>
            </div>

            <div>
              <label className="text-xs sm:text-sm text-gray-500 block mb-1">Status</label>
              <p
                className={`font-medium text-base sm:text-lg ${
                  user?.status === "ACTIVE" ? "text-green-600" : "text-red-600"
                }`}
              >
                {user?.status === "ACTIVE" ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {user && isModalOpen && (
        <UpdateProfileModal
          user={user}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => setIsModalOpen(false)}
        />
      )}
      </Layout>
    );
  }
