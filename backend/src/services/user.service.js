import bcrypt from "bcryptjs";

import {
  getAllUsers,
  createUser,
  updateUser,
  updateUserStatus,
  findUserById,
  findUserByEmail,
} from "../repositories/user.repository.js";

import { findRoleByName } from "../repositories/role.repository.js";

export const getAllUsersService = async () => {
  return await getAllUsers();
};

export const createUserService = async (name, email, password, role) => {
  const existing = await findUserByEmail(email);
  if (existing) {
    throw { statusCode: 409, message: "Email already exists" };
  }

  const roleRow = await findRoleByName(role);
  if (!roleRow) {
    throw { statusCode: 400, message: "Invalid role" };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const userId = await createUser(
    name,
    email,
    passwordHash,
    roleRow.id
  );

  return {
    id: userId,
    name,
    email,
    role,
    status: "ACTIVE",
  };
};

export const updateUserService = async (id, data) => {
  const existingUser = await findUserById(id);
  if (!existingUser) {
    throw { statusCode: 404, message: "User not found" };
  }

  const fields = [];
  const values = [];

  if (data.name) {
    fields.push("name=?");
    values.push(data.name);
  }

  if (data.role) {
    const roleRow = await findRoleByName(data.role);
    if (!roleRow) {
      throw { statusCode: 400, message: "Invalid role" };
    }
    fields.push("role_id=?");
    values.push(roleRow.id);
  }

  if (data.status) {
    fields.push("status=?");
    values.push(data.status);
  }

  if (fields.length === 0) {
    throw { statusCode: 400, message: "Nothing to update" };
  }

  await updateUser(id, fields, values);

  return { message: "User updated successfully" };
};

export const updateUserStatusService = async (id, status) => {
  const result = await updateUserStatus(id, status);

  if (result.affectedRows === 0) {
    throw { statusCode: 404, message: "User not found" };
  }

  return { message: `User status updated to ${status}` };
};

export const getProfileService = async (id) => {
  const user = await findUserById(id);

  if (!user) {
    throw { statusCode: 404, message: "User not found" };
  }

  return user;
};