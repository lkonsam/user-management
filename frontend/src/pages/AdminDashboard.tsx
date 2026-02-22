import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import UsersTable from "../components/UsersTable";
import CreateUserModal from "../components/CreateUserModal";

export default function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <div className="w-full sm:w-auto">
            <h2 className="text-lg sm:text-xl font-semibold">Users Management</h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              Manage system users and their status
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base font-medium transition"
          >
            + Add User
          </button>
        </div>

        <UsersTable key={refresh.toString()} />

        {showModal && (
          <CreateUserModal
            onClose={() => setShowModal(false)}
            onSuccess={() => setRefresh(!refresh)}
          />
        )}
      </div>
    </AdminLayout>
  );
}
