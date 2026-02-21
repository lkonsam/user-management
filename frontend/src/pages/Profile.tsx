import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import UserLayout from "../layouts/UserLayout";

export default function Profile() {
  const context = useContext(AuthContext);
  const user = context?.user;

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">My Profile</h2>

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
                user?.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {user?.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
