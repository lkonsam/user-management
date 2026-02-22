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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            required
            value={form.name}
            className="w-full border px-4 py-2 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            className="w-full border px-4 py-2 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {!isSelfProfile && (
            <select
              className="w-full border px-4 py-2 rounded-lg"
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

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
