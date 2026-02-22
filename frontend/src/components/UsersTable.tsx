import { useEffect, useState } from "react";
import { getUsers, updateUserStatus } from "../api/user.api";
import type { User } from "../types/auth.types";
import UpdateProfileModal from "./UpdateProfileModal";

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.users);
    } catch (error) {
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggle = async (user: User) => {
    try {
      await updateUserStatus(user.id, user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE");

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, status: u.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" } : u
        )
      );
    } catch (error) {
      alert("Failed to update status");
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-sm sm:text-base">Loading users...</div>;
  }

  return (
    <div>
      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-gray-700 font-medium">Name</th>
              <th className="px-4 sm:px-6 py-3 text-left text-gray-700 font-medium">Email</th>
              <th className="px-4 sm:px-6 py-3 text-left text-gray-700 font-medium">Role</th>
              <th className="px-4 sm:px-6 py-3 text-left text-gray-700 font-medium">Status</th>
              <th className="px-4 sm:px-6 py-3 text-center text-gray-700 font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 sm:px-6 py-4 text-gray-900">{user.name}</td>
                <td className="px-4 sm:px-6 py-4 text-gray-900">{user.email}</td>
                <td className="px-4 sm:px-6 py-4 text-gray-900">{user.role}</td>

                <td className="px-4 sm:px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status === "ACTIVE" ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-4 sm:px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setIsModalOpen(true);
                      }}
                      className="px-3 py-1 rounded-lg text-white text-xs bg-blue-600 hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggle(user)}
                      className={`px-3 py-1 rounded-lg text-white text-xs transition ${
                        user.status === "ACTIVE"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {user.status === "ACTIVE" ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-3 sm:space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow rounded-lg p-4 border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-base">{user.name}</h3>
                <p className="text-gray-500 text-xs sm:text-sm break-all">{user.email}</p>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  user.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user.status === "ACTIVE" ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="flex gap-2 mb-3 text-xs sm:text-sm">
              <span className="bg-gray-100 px-2.5 py-1 rounded text-gray-700">
                {user.role}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedUser(user);
                  setIsModalOpen(true);
                }}
                className="flex-1 px-3 py-2 rounded-lg text-white text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 transition font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleToggle(user)}
                className={`flex-1 px-3 py-2 rounded-lg text-white text-xs sm:text-sm transition font-medium ${
                  user.status === "ACTIVE"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {user.status === "ACTIVE" ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && isModalOpen && (
        <UpdateProfileModal
          user={selectedUser}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          onSuccess={() => {
            fetchUsers();
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}
