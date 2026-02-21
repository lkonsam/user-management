import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import UsersTable from "../components/UsersTable";
import CreateUserModal from "../components/CreateUserModal";

export default function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Users Management</h2>
            <p className="text-gray-500 text-sm">
              Manage system users and their status
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
