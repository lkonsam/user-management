import {
  getAllUsersService,
  createUserService,
  updateUserService,
  updateUserStatusService,
  getProfileService,
} from "../services/user.service.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await createUserService(name, email, password, role);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const isAdmin = req.user.role === 'ADMIN';
    // Check if it's a self update: if no params.id or params.id matches current user
    const isSelfUpdate = !req.params.id || parseInt(req.params.id) === req.user.id;
    const IdToChange = isSelfUpdate ? req.user.id : parseInt(req.params.id);
    
    // Only admins can update other users
    if (!isSelfUpdate && !isAdmin) {
      throw { statusCode: 403, message: "You can only edit your own profile" };
    }
    
    // Don't allow role changes for self updates
    if (isSelfUpdate && req.body.role) {
      throw { statusCode: 403, message: "You cannot change your own role" };
    }
    
    // Only admins can change roles
    if (req.body.role && !isAdmin) {
      throw { statusCode: 403, message: "Only admins can change user roles" };
    }
    
    const result = await updateUserService(IdToChange, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const result = await updateUserStatusService(
      req.params.id,
      req.body.status
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await getProfileService(req.user.id);
    res.json({ profile: user });
  } catch (error) {
    next(error);
  }
};