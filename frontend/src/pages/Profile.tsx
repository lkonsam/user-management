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
      <div className="max-w-lg mx-auto bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Profile</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <p className="font-medium">{user?.name}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="font-medium">{user?.email}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Role</label>
            <p className="font-medium">{user?.role}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Status</label>
            <p
              className={`font-medium ${
                user?.status === "ACTIVE" ? "text-green-600" : "text-red-600"
              }`}
            >
              {user?.status === "ACTIVE" ? "Active" : "Inactive"}
            </p>
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
