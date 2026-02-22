import { useState, useContext } from "react";
import { updateUser } from "../api/user.api";
import { AuthContext } from "../context/AuthContext";
import type { User } from "../types/auth.types";

interface Props {
  user: User;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UpdateProfileModal({ user, onClose, onSuccess }: Props) {
  const context = useContext(AuthContext);
  const isSelfProfile = context?.user?.id === user.id;
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      
      // Only include id if it's not a self update
      const updateData: any = { ...form };
      if (!isSelfProfile) {
        updateData.id = user.id;
      } else {
        updateData.self = true;
        // Remove role from update data for self updates
        delete updateData.role;
      }
      
      await updateUser(updateData);
      
      // Only update the user in the auth context if editing own profile
      if (isSelfProfile && context) {
        context.login({
          token: localStorage.getItem("token") || "",
          user: {
            ...user,
            ...form,
          },
        });
      }
      
      onSuccess();
      onClose();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <input
            type="text"
            placeholder="Name"
            required
            value={form.name}
            className="w-full border border-gray-300 px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            className="w-full border border-gray-300 px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {!isSelfProfile && (
            <select
              className="w-full border border-gray-300 px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value as "ADMIN" | "USER",
                })
              }
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          )}

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-sm sm:text-base font-medium transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-sm sm:text-base font-medium transition"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
